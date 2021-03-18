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

import React, { useState, ReactNode, forwardRef, Ref } from 'react';
import Icon from 'core/components/Icon';
import Text from 'core/components/Text';
import Styled from './styled';

export interface Props {
  title: string;
  className?: string;
  dismissLabel: string;
  continueLabel?: string;
  onContinue?: Function;
  onDismiss: Function;
  isDisabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}

const Trigger = forwardRef(({
  className,
  onContinue,
  onDismiss,
  continueLabel,
  dismissLabel,
  title,
  isDisabled,
  isLoading,
  children
}: Props, ref: Ref<HTMLDivElement>) => {
  const [toggle, switchToggle] = useState(true);

  const handleDismiss = () => {
    switchToggle(!toggle);
    onDismiss();
  };

  return (
    toggle && (
      <Styled.Wrapper data-testid="modal-trigger" className={className}>
        <Styled.Background className="modal-background" />
        <Styled.Content className="modal-content" ref={ref}>
          <Styled.Button.Container>
            <Icon
              name="cancel"
              size="22px"
              onClick={() => handleDismiss()}
              color="light"
              data-testid="icon-cancel-modal"
            />
          </Styled.Button.Container>
          <Styled.Title weight="bold" color="light">
            {title}
          </Styled.Title>
          {children}
          <Styled.Buttons className="modal-buttons">
            <Styled.Button.Dismiss
              id="dismiss"
              className="modal-button-dismiss"
              onClick={() => handleDismiss()}
            >
              <Text.h5 color="light">{dismissLabel}</Text.h5>
            </Styled.Button.Dismiss>
            {onContinue && (
              <Styled.Button.Continue
                id="continue"
                className="modal-button-continue"
                isLoading={isLoading}
                isDisabled={isDisabled}
                onClick={() => onContinue()}
              >
                <Text.h5 color="light">{continueLabel}</Text.h5>
              </Styled.Button.Continue>
            )}
          </Styled.Buttons>
        </Styled.Content>
      </Styled.Wrapper>
    )
  );
});

export default Trigger;
