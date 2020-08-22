package v1

import (
	"compass/internal/metricsgroup"
	"compass/web/api"
	"errors"
	"net/http"

	"github.com/google/uuid"

	"github.com/julienschmidt/httprouter"
)

type MetricsGroupApi struct {
	metricsGroupMain metricsgroup.UseCases
}

func (v1 V1) NewMetricsGroupApi(metricsGroupMain metricsgroup.UseCases) MetricsGroupApi {
	apiPath := "/metrics-groups"
	metricsGroupApi := MetricsGroupApi{metricsGroupMain}
	v1.Router.GET(v1.getCompletePath(apiPath), api.HttpValidator(metricsGroupApi.list))
	v1.Router.POST(v1.getCompletePath(apiPath), api.HttpValidator(metricsGroupApi.create))
	v1.Router.GET(v1.getCompletePath(apiPath+"/:id"), api.HttpValidator(metricsGroupApi.show))
	v1.Router.GET(v1.getCompletePath(apiPath+"/:id/query"), api.HttpValidator(metricsGroupApi.query))
	v1.Router.GET(v1.getCompletePath(apiPath+"/:id/result"), api.HttpValidator(metricsGroupApi.result))
	v1.Router.PATCH(v1.getCompletePath(apiPath+"/:id"), api.HttpValidator(metricsGroupApi.update))
	v1.Router.DELETE(v1.getCompletePath(apiPath+"/:id"), api.HttpValidator(metricsGroupApi.delete))
	v1.Router.POST(v1.getCompletePath(apiPath)+"/:id/metrics", api.HttpValidator(metricsGroupApi.createMetric))
	v1.Router.PUT(v1.getCompletePath(apiPath+"/:id/metrics/:metricId"), api.HttpValidator(metricsGroupApi.updateMetric))
	v1.Router.DELETE(v1.getCompletePath(apiPath+"/:id/metrics/:metricId"), api.HttpValidator(metricsGroupApi.deleteMetric))
	v1.Router.GET(v1.getCompletePath("/resume"+apiPath), api.HttpValidator(metricsGroupApi.resume))
	return metricsGroupApi
}

func (metricsGroupApi MetricsGroupApi) list(w http.ResponseWriter, r *http.Request, _ httprouter.Params, workspaceId string) {
	circles, err := metricsGroupApi.metricsGroupMain.FindAll()
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	api.NewRestSuccess(w, http.StatusOK, circles)
}

func (metricsGroupApi MetricsGroupApi) resume(w http.ResponseWriter, r *http.Request, _ httprouter.Params, workspaceId string) {
	circleId := r.URL.Query().Get("circleId")

	metricGroups, err := metricsGroupApi.metricsGroupMain.ResumeByCircle(circleId)
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	api.NewRestSuccess(w, http.StatusOK, metricGroups)
}

func (metricsGroupApi MetricsGroupApi) create(w http.ResponseWriter, r *http.Request, _ httprouter.Params, workspaceId string) {
	metricsGroup, err := metricsGroupApi.metricsGroupMain.Parse(r.Body)

	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	if err := metricsGroup.Validate(); len(err) > 0 {
		api.NewRestError(w, http.StatusInternalServerError, err)
		return
	}

	metricsGroup.WorkspaceID, err = uuid.Parse(workspaceId)
	createdCircle, err := metricsGroupApi.metricsGroupMain.Save(metricsGroup)
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	api.NewRestSuccess(w, http.StatusOK, createdCircle)
}

func (metricsGroupApi MetricsGroupApi) show(w http.ResponseWriter, r *http.Request, ps httprouter.Params, workspaceId string) {
	id := ps.ByName("id")
	metricsGroup, err := metricsGroupApi.metricsGroupMain.FindById(id)
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	api.NewRestSuccess(w, http.StatusOK, metricsGroup)
}

func (metricsGroupApi MetricsGroupApi) query(w http.ResponseWriter, r *http.Request, ps httprouter.Params, workspaceId string) {
	id := ps.ByName("id")

	period := r.URL.Query().Get("period")
	if period == "" {
		api.NewRestError(w, http.StatusInternalServerError, []error{
			errors.New("Query param period is empty"),
		})
		return
	}

	err := metricsGroupApi.metricsGroupMain.PeriodValidate(period)
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	queryResult, err := metricsGroupApi.metricsGroupMain.QueryByGroupID(id, period)
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	api.NewRestSuccess(w, http.StatusOK, queryResult)
}

func (metricsGroupApi MetricsGroupApi) result(w http.ResponseWriter, r *http.Request, ps httprouter.Params, workspaceId string) {
	id := ps.ByName("id")

	queryResult, err := metricsGroupApi.metricsGroupMain.ResultByID(id)
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	api.NewRestSuccess(w, http.StatusOK, queryResult)
}

func (metricsGroupApi MetricsGroupApi) update(w http.ResponseWriter, r *http.Request, ps httprouter.Params, workspaceId string) {
	id := ps.ByName("id")
	metricsGroup, err := metricsGroupApi.metricsGroupMain.Parse(r.Body)
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	updatedWorkspace, err := metricsGroupApi.metricsGroupMain.Update(id, metricsGroup)
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	api.NewRestSuccess(w, http.StatusOK, updatedWorkspace)
}

func (metricsGroupApi MetricsGroupApi) delete(w http.ResponseWriter, r *http.Request, ps httprouter.Params, workspaceId string) {
	id := ps.ByName("id")
	err := metricsGroupApi.metricsGroupMain.Remove(string(id))
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	api.NewRestSuccess(w, http.StatusNoContent, nil)
}

func (metricsGroupApi MetricsGroupApi) createMetric(w http.ResponseWriter, r *http.Request, ps httprouter.Params, workspaceId string) {
	id := ps.ByName("id")
	metric, err := metricsGroupApi.metricsGroupMain.ParseMetric(r.Body)

	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	if err := metric.Validate(); len(err) > 0 {
		api.NewRestError(w, http.StatusInternalServerError, err)
		return
	}

	metric.MetricsGroupID, err = uuid.Parse(id)
	createdMetric, err := metricsGroupApi.metricsGroupMain.SaveMetric(metric)
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	api.NewRestSuccess(w, http.StatusOK, createdMetric)
}

func (metricsGroupApi MetricsGroupApi) updateMetric(w http.ResponseWriter, r *http.Request, ps httprouter.Params, workspaceId string) {
	groupID := ps.ByName("id")
	metricID := ps.ByName("metricId")
	metric, err := metricsGroupApi.metricsGroupMain.ParseMetric(r.Body)
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	metric.ID, _ = uuid.Parse(metricID)
	metric.MetricsGroupID, _ = uuid.Parse(groupID)

	updatedMetric, err := metricsGroupApi.metricsGroupMain.UpdateMetric(metricID, metric)
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	api.NewRestSuccess(w, http.StatusOK, updatedMetric)
}

func (metricsGroupApi MetricsGroupApi) deleteMetric(w http.ResponseWriter, r *http.Request, ps httprouter.Params, workspaceId string) {
	id := ps.ByName("metricId")
	err := metricsGroupApi.metricsGroupMain.RemoveMetric(string(id))
	if err != nil {
		api.NewRestError(w, http.StatusInternalServerError, []error{err})
		return
	}

	api.NewRestSuccess(w, http.StatusNoContent, nil)
}
