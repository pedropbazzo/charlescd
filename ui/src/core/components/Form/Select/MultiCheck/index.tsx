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

import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { OptionTypeBase } from 'react-select';
import { Option } from '../interfaces';
import Select from './Select';

export interface Props {
  name: string;
  control: Control<any>;
  options?: OptionTypeBase[];
  rules?: Partial<{ required: boolean | string }>;
  defaultValue?: Option[];
  className?: string;
  label?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onChange?: (value: Option[]) => void;
  onInputChange?: (value: string) => void;
  customOption?: React.ReactNode;
  closeMenuOnSelect?: boolean;
  hideSelectedOptions?: boolean;
}

const MultiCheck = ({
  name,
  control,
  options,
  customOption,
  className,
  defaultValue,
  label,
  onChange,
  isLoading
}: Props) => (
  <div data-testid={`select-${name}`}>
    <Controller
      as={<Select />}
      options={options}
      name={name}
      control={control}
      customOption={customOption}
      className={className}
      defaultValue={defaultValue}
      label={label}
      isLoading={isLoading}
      onChange={([selectedOptions]: [OptionTypeBase[]]) => {
        onChange && onChange(selectedOptions);
        return selectedOptions;
      }}
    />
  </div>
);

export default MultiCheck;
