/*
 *
 *  * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *     http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

package io.charlescd.moove.application.workspace.impl

import io.charlescd.moove.application.*
import io.charlescd.moove.application.workspace.PatchWorkspaceInteractor
import io.charlescd.moove.application.workspace.request.PatchWorkspaceRequest
import io.charlescd.moove.domain.Circles
import io.charlescd.moove.domain.MooveErrorCode
import io.charlescd.moove.domain.Workspace
import io.charlescd.moove.domain.exceptions.BusinessException
import io.charlescd.moove.domain.service.CircleMatcherService
import javax.inject.Named

@Named
open class PatchWorkspaceInteractorImpl(
    private val gitConfigurationService: GitConfigurationService,
    private val workspaceService: WorkspaceService,
    private val registryConfigurationService: RegistryConfigurationService,
    private val metricConfigurationService: MetricConfigurationService,
    private val circleMatcherService: CircleMatcherService,
    private val circleService: CircleService,
    private val deploymentConfigurationService: DeploymentConfigurationService
) : PatchWorkspaceInteractor {

    override fun execute(workspaceId: String, request: PatchWorkspaceRequest) {
        request.validate()

        val workspace = workspaceService.find(workspaceId)
        val updatedWorkspace = request.applyPatch(workspace)

        checkIfNewConfigurationsExist(workspaceId, workspace, updatedWorkspace)

        syncWithCircleMatcherIfNecessary(workspace, updatedWorkspace)

        workspaceService.update(updatedWorkspace.copy(status = updatedWorkspace.checkCurrentWorkspaceStatus()))
    }

    private fun syncWithCircleMatcherIfNecessary(currentWorkspace: Workspace, updatedWorkspace: Workspace) {
        if (isCircleMatcherUrlNew(currentWorkspace, updatedWorkspace)) {
            val circles = circleService.findByWorkspaceId(currentWorkspace.id)
            if (!circles.hasDefault()) {
                throw BusinessException.of(MooveErrorCode.MISSING_DEFAULT_CIRCLE)
            }

            if (currentWorkspace.hasCircleMatcher()) {
                deleteAllCirclesOnCircleMatcher(currentWorkspace.circleMatcherUrl!!, circles)
            }

            if (updatedWorkspace.hasCircleMatcher()) {
                deleteAllCirclesOnCircleMatcher(updatedWorkspace.circleMatcherUrl!!, circles)
                createAllCirclesOnCircleMatcher(updatedWorkspace.circleMatcherUrl!!, circles)
            }
        }
    }

    private fun isCircleMatcherUrlNew(
        workspace: Workspace,
        updatedWorkspace: Workspace
    ) = workspace.circleMatcherUrl != updatedWorkspace.circleMatcherUrl

    private fun createAllCirclesOnCircleMatcher(circleMatcherUrl: String, circles: Circles) {
        try {
            this.circleMatcherService.saveAllFor(circles, circleMatcherUrl)
        } catch (exception: Exception) {
            throw BusinessException.of(MooveErrorCode.INVALID_CIRCLE_MATCHER_URL_ERROR)
        }
    }

    private fun deleteAllCirclesOnCircleMatcher(circleMatcherUrl: String, circles: Circles) {
        try {
            this.circleMatcherService.deleteAllFor(circles, circleMatcherUrl)
        } catch (exception: Exception) {
            throw BusinessException.of(MooveErrorCode.INVALID_CIRCLE_MATCHER_URL_ERROR)
        }
    }

    private fun checkIfNewConfigurationsExist(workspaceId: String, workspace: Workspace, updatedWorkspace: Workspace) {
        if (shouldConfigurationBeChecked(workspace.gitConfigurationId, updatedWorkspace.gitConfigurationId)) {
            gitConfigurationService.checkIfGitConfigurationExists(
                workspaceId,
                updatedWorkspace.gitConfigurationId!!
            )
        }

        if (shouldConfigurationBeChecked(workspace.registryConfigurationId, updatedWorkspace.registryConfigurationId)) {
            registryConfigurationService.checkIfRegistryConfigurationExists(
                workspaceId,
                updatedWorkspace.registryConfigurationId!!
            )
        }

        if (shouldConfigurationBeChecked(workspace.deploymentConfigurationId, updatedWorkspace.deploymentConfigurationId)) {
            deploymentConfigurationService.checkIfDeploymentConfigurationExists(
                workspaceId,
                updatedWorkspace.deploymentConfigurationId!!
            )
        }

        if (shouldConfigurationBeChecked(workspace.metricConfigurationId, updatedWorkspace.metricConfigurationId)) {
            metricConfigurationService.checkIfMetricConfigurationExists(
                updatedWorkspace.metricConfigurationId!!,
                workspaceId
            )
        }
    }

    private fun shouldConfigurationBeChecked(configuration: String?, updatedInformation: String?): Boolean {
        return configuration != updatedInformation && updatedInformation != null
    }
}
