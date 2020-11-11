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

package health

import (
	"github.com/ZupIT/charlescd/compass/internal/datasource"
	"github.com/ZupIT/charlescd/compass/internal/moove"
	"github.com/ZupIT/charlescd/compass/internal/plugin"

	"github.com/jinzhu/gorm"
)

type UseCases interface {
	Components(circleIDHeader, workspaceId, circleId, projectionType, metricType string) (ComponentMetricRepresentation, error)
	ComponentsHealth(circleIDHeader, workspaceId, circleId string) (CircleHealthRepresentation, error)
}

type Main struct {
	db         *gorm.DB
	datasource datasource.UseCases
	pluginMain plugin.UseCases
	mooveMain  moove.APIClient
}

func NewMain(db *gorm.DB, datasource datasource.UseCases, pluginMain plugin.UseCases, mooveMain moove.APIClient) UseCases {
	return Main{db, datasource, pluginMain, mooveMain}
}
