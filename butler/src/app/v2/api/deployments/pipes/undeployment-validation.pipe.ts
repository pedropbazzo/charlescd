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

import { HttpStatus, Injectable, PipeTransform } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DeploymentEntityV2 as DeploymentEntity } from '../entity/deployment.entity'
import { ComponentsRepositoryV2 } from '../repository/component.repository'
import { ExceptionBuilder } from '../../../core/utils/exception.utils'

@Injectable()
export class UndeploymentValidation implements PipeTransform {

  constructor(
    @InjectRepository(DeploymentEntity)
    private readonly deploymentsRepository: Repository<DeploymentEntity>,
    @InjectRepository(ComponentsRepositoryV2)
    private componentsRepository: ComponentsRepositoryV2
  ) {}

  public async transform(deploymentId: string): Promise<string> {
    const deployment = await this.deploymentsRepository.findOneOrFail({ id: deploymentId })
    if (deployment.current === false) {
      throw new ExceptionBuilder('Cannot undeploy not current deployment', HttpStatus.BAD_REQUEST)
        .build()
    }

    // const circleId = deployment.circleId
    // const runningComponents = deployment.defaultCircle ?
    //   await this.componentsRepository.findDefaultCircleCreatedExecution(circleId) :
    //   await this.componentsRepository.findCircleCreatedExecution(circleId)

    // if (runningComponents && runningComponents.length > 0) {
    //   const componentIds = runningComponents.map( c => c.id)
    //   const components = await this.componentsRepository.findByIds(componentIds, { relations: ['deployment', 'deployment.executions'] })
    //   const executionIds = uniq(flatMap(components, c => c.deployment.executions.map(e => e.id)))
    //   throw new BadRequestException(`Simultaneous undeployments are not allowed for a given circle. The following executions are not finished: ${executionIds}`)
    // }

    return deploymentId
  }
}
