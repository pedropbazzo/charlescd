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

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddPreviousDeploymentIdTov2deployments20210115163900 implements MigrationInterface {

  public async up(queryRunner: QueryRunner) : Promise<void> {
    await queryRunner.addColumn('v2deployments', new TableColumn({
      name: 'previous_deployment_id',
      type: 'uuid',
      isNullable: true
    }))
  }

  public async down(queryRunner: QueryRunner) : Promise<void> {
    await queryRunner.dropColumn('v2deployments', 'previous_deployment_id')
  }
}
