package io.charlescd.villager.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.charlescd.villager.interactor.registry.ComponentTagListDTO;

public interface DockerRegistryCacheService {
    void delete(String key);

    ComponentTagListDTO get(String key) throws JsonProcessingException;

    void set(String key, String value);

    boolean isExistingKey(String key);
}