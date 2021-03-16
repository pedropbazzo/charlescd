/*
 *
 *  Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

package message

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"hermes/internal/notification/messageexecutionhistory"
	"hermes/internal/notification/payloads"
	"hermes/pkg/errors"
	"hermes/rabbitclient"
	"io"
)

type UseCases interface {
	ParsePayload(request io.ReadCloser) (payloads.PayloadRequest, errors.Error)
	Validate(message payloads.PayloadRequest) errors.ErrorList
	Publish(messagesRequest []payloads.Request) ([]payloads.MessageResponse, errors.Error)
	FindAllBySubscriptionIdAndFilter(subscriptionId uuid.UUID, parameters map[string]string, page int, size int) ([]payloads.FullMessageResponse, errors.Error)
	FindAllNotEnqueuedAndDeliveredFail() ([]payloads.MessageResponse, errors.Error)
	FindMostRecent(subscriptionId uuid.UUID) (payloads.StatusResponse, errors.Error)
}

type Main struct {
	db            *gorm.DB
	amqpClient    *rabbitclient.Client
	executionMain messageexecutionhistory.UseCases
}

func NewMain(db *gorm.DB, amqpClient *rabbitclient.Client, executionMain messageexecutionhistory.UseCases) UseCases {
	return Main{db, amqpClient, executionMain}
}
