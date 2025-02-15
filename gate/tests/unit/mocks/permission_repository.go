// Code generated by mockery v0.0.0-dev. DO NOT EDIT.

package mocks

import (
	domain "github.com/ZupIT/charlescd/gate/internal/domain"
	mock "github.com/stretchr/testify/mock"
)

// PermissionRepository is an autogenerated mock type for the PermissionRepository type
type PermissionRepository struct {
	mock.Mock
}

// FindAll provides a mock function with given fields: permissions
func (_m *PermissionRepository) FindAll(permissions []string) ([]domain.Permission, error) {
	ret := _m.Called(permissions)

	var r0 []domain.Permission
	if rf, ok := ret.Get(0).(func([]string) []domain.Permission); ok {
		r0 = rf(permissions)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]domain.Permission)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func([]string) error); ok {
		r1 = rf(permissions)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// FindBySystemTokenID provides a mock function with given fields: systemTokenId
func (_m *PermissionRepository) FindBySystemTokenID(systemTokenId string) ([]domain.Permission, error) {
	ret := _m.Called(systemTokenId)

	var r0 []domain.Permission
	if rf, ok := ret.Get(0).(func(string) []domain.Permission); ok {
		r0 = rf(systemTokenId)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]domain.Permission)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(string) error); ok {
		r1 = rf(systemTokenId)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}
