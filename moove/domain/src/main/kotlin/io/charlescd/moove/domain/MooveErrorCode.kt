/*
 * Copyright 2020, 2021 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.charlescd.moove.domain

enum class MooveErrorCode(val key: String) {
    ARCHIVE_DEPLOYED_BUILD("archive.deployed.build"),
    DELETE_DEPLOYED_BUILD("delete.deployed.build"),
    DEPLOY_INVALID_BUILD("deploy.invalid.build"),
    GIT_ERROR_BASE_NOT_FOUND("base.branch.not.found"),
    GIT_ERROR_HEAD_NOT_FOUND("head.branch.not.found"),
    GIT_ERROR_REPOSITORY_NOT_FOUND("repository.not.found"),
    GIT_ERROR_TAG_NOT_FOUND("tag.not.found"),
    GIT_ERROR_MERGE_CONFLICT("merge.conflict"),
    GIT_ERROR_MERGE_ERROR("merge.error"),
    GIT_ERROR_DUPLICATED_BRANCH("duplicated.branch"),
    GIT_ERROR_DUPLICATED_TAG("duplicated.tag"),
    GIT_ERROR_FORBIDDEN("git.forbidden"),
    GIT_INTEGRATION_ERROR("git.integration.error"),
    GIT_ERROR_BRANCH_NOT_FOUND("branch.not.found"),
    GIT_ERROR_PROVIDER_NOT_FOUND("git.provider.not.found"),
    GIT_CREDENTIALS_NOT_FOUND("git.credentials.not.found"),
    INTERNAL_SERVER_ERROR("internal.server.error"),
    INVALID_BUILD_STATUS("invalid.build.status"),
    INVALID_PAYLOAD("invalid.payload"),
    CONFLICT("conflict"),
    UNAUTHORIZED("unauthorized"),
    MISSING_PARAMETER("missing.parameter"),
    MOVE_BUILD_INVALID_COLUMN("move.build.invalid.column"),
    FORBIDDEN("forbidden"),
    WORKSPACE_GIT_CONFIGURATION_IS_MISSING("workspace.git.configuration.is.missing"),
    WORKSPACE_MATCHER_URL_IS_MISSING("workspace.matcher_url.is.missing"),
    WORKSPACE_DOCKER_REGISTRY_CONFIGURATION_IS_MISSING("workspace.docker.registry.configuration.is.missing"),
    WORKSPACE_DEPLOYMENT_CONFIGURATION_IS_MISSING("workspace.deployment.configuration.is.missing"),
    SOME_OF_INFORMED_FEATURES_DOES_NOT_EXIST_OR_ARE_NOT_READY_TO_GO("some.of.informed.features.does.not.exist.or.are.not.ready.to.go"),
    CIRCLE_DEPLOYMENT_ACTIVE("circle.deployment.active"),
    CANNOT_UPDATE_DEFAULT_CIRCLE("cannot.update.default.circle"),
    CANNOT_DELETE_DEFAULT_CIRCLE("cannot.delete.default.circle"),
    COMPONENT_ALREADY_REGISTERED("component.already.registered"),
    CANNOT_CREATE_MODULES_IN_A_INCOMPLETE_WORKSPACE("cannot.create.modules.in.a.incomplete.workspace"),
    USER_GROUP_ALREADY_ASSOCIATED("user.group.already.associated"),
    USER_GROUP_ALREADY_DISASSOCIATED("user.group.already.disassociated"),
    USER_ALREADY_ASSOCIATED("user.already.associated"),
    USER_ALREADY_DISASSOCIATED("user.already.disassociated"),
    MISSING_DEFAULT_CIRCLE("missing.default.circle"),
    INVALID_CIRCLE_MATCHER_URL_ERROR("invalid.circle.matcher.url.error"),
    INVALID_BUTLER_URL_ERROR("invalid.butler.url.error"),
    MODULE_MUST_HAVE_AT_LEAST_ONE_COMPONENT("module.must.have.at.least.one.component"),
    CREATE_USER_ERROR_EMAIL_ALREADY_EXISTS("create.user.error.email.already.exists"),
    USER_PASSWORD_DOES_NOT_MATCH("user.password.does.not.match"),
    CANNOT_RESET_YOUR_OWN_PASSWORD("cannot.reset.your.own.password"),
    EXTERNAL_IDM_FORBIDDEN("external.idm.forbidden"),
    LIMIT_OF_PERCENTAGE_CIRCLES_EXCEEDED("limit.of.percentage.circles.exceeded"),
    IDM_UNEXPECTED_ERROR("idm.unexpected.error"),
    DUPLICATED_COMPONENT_NAME_ERROR("duplicated.component.name.error"),
    DEPLOYMENT_CONFIGURATION_ALREADY_REGISTERED("deployment.configuration.already.registered"),
    ACTIVE_DEPLOYMENT_NAMESPACE_ERROR("active.deployment.namespace.error"),
    DUPLICATED_WORKSPACE_NAME_ERROR("duplicated.workspace.name.error"),
    DUPLICATED_CIRCLE_NAME_ERROR("duplicated.circle.name.error")
}
