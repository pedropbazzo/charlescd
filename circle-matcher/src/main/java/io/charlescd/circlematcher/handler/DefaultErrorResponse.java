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

package io.charlescd.circlematcher.handler;

import com.fasterxml.jackson.annotation.JsonInclude;


import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DefaultErrorResponse {
    private  String id;
    public List<String> links;
    public String title;
    public String details;
    public String status;
    public Source source;
    public String meta;
    public DefaultErrorResponse(
            String id,
            List<String> links,
            String title,
            String details,
            String status,
            Source source,
            String meta
    ) {
        this.links = links;
        this.title = title;
        this.details = details;
        this.status = status;
        this.source = source;
        this.meta = meta;
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getLinks() {
        return links;
    }

    public void setLinks(List<String> links) {
        this.links = links;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getCode() {
        return status;
    }

    public void setCode(String status) {
        this.status = status;
    }

    public Source getSource() {
        return source;
    }

    public void setSource(Source source) {
        this.source = source;
    }

    public String getMeta() {
        return meta;
    }

    public void setMeta(String meta) {
        this.meta = meta;
    }

}
@JsonInclude(JsonInclude.Include.NON_NULL)
class Source {
    public String getPointer() {
        return pointer;
    }

    public void setPointer(String pointer) {
        this.pointer = pointer;
    }

    public String getParameter() {
        return parameter;
    }

    public Source(String pointer, String parameter) {
        this.pointer = pointer;
        this.parameter = parameter;
    }
    public Source(String pointer) {
        this.pointer = pointer;
    }

    public void setParameter(String parameter) {
        this.parameter = parameter;
    }

    private String pointer;
    private String parameter;
}