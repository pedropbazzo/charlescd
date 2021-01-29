/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
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

package io.charlescd.moove.application.webhook.impl

import io.charlescd.moove.application.WebhookService
import io.charlescd.moove.application.webhook.UpdateWebhookSubscriptionInteractor
import io.charlescd.moove.application.webhook.request.UpdateWebhookSubscriptionRequest
import io.charlescd.moove.application.webhook.response.WebhookSubscriptionResponse
import io.charlescd.moove.domain.User
import io.charlescd.moove.domain.WebhookSubscription
import io.charlescd.moove.domain.service.HermesService
import javax.inject.Inject
import javax.inject.Named

@Named
class UpdateWebhookSubscriptionInteractorImpl @Inject constructor(
    private val webhookService: WebhookService,
    private val hermesService: HermesService
) : UpdateWebhookSubscriptionInteractor {
    override fun execute(
        workspaceId: String,
        authorization: String,
        id: String,
        request: UpdateWebhookSubscriptionRequest
    ): WebhookSubscriptionResponse {
        val webhookSubscription = updateSubscription(workspaceId, authorization, id, request.events)
        return WebhookSubscriptionResponse.from(webhookSubscription)
    }

    private fun updateSubscription(
        workspaceId: String,
        authorization: String,
        id: String,
        events: List<String>
    ): WebhookSubscription {
        val author = webhookService.getAuthor(authorization)
        validateSubscription(workspaceId, author, id)
        return hermesService.updateSubscription(author.email, id, events)
    }

    private fun validateSubscription(workspaceId: String, author: User, id: String) {
        val subscription = hermesService.getSubscription(author.email, id)
        webhookService.validateWorkspace(workspaceId, id, author, subscription)
    }
}
