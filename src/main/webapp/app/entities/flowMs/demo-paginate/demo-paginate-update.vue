<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate v-on:submit.prevent="save()">
        <h2
          id="appGwApp.flowMsDemoPaginate.home.createOrEditLabel"
          data-cy="DemoPaginateCreateUpdateHeading"
          v-text="t$('appGwApp.flowMsDemoPaginate.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="demoPaginate.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="demoPaginate.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('appGwApp.flowMsDemoPaginate.name')" for="demo-paginate-name"></label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="demo-paginate-name"
              data-cy="name"
              :class="{ valid: !v$.name.$invalid, invalid: v$.name.$invalid }"
              v-model="v$.name.$model"
              required
            />
            <div v-if="v$.name.$anyDirty && v$.name.$invalid">
              <small class="form-text text-danger" v-for="error of v$.name.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('appGwApp.flowMsDemoPaginate.creationDate')"
              for="demo-paginate-creationDate"
            ></label>
            <div class="d-flex">
              <input
                id="demo-paginate-creationDate"
                data-cy="creationDate"
                type="datetime-local"
                class="form-control"
                name="creationDate"
                :class="{ valid: !v$.creationDate.$invalid, invalid: v$.creationDate.$invalid }"
                :value="convertDateTimeFromServer(v$.creationDate.$model)"
                @change="updateInstantField('creationDate', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('appGwApp.flowMsDemoPaginate.age')" for="demo-paginate-age"></label>
            <input
              type="number"
              class="form-control"
              name="age"
              id="demo-paginate-age"
              data-cy="age"
              :class="{ valid: !v$.age.$invalid, invalid: v$.age.$invalid }"
              v-model.number="v$.age.$model"
            />
            <div v-if="v$.age.$anyDirty && v$.age.$invalid">
              <small class="form-text text-danger" v-for="error of v$.age.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('appGwApp.flowMsDemoPaginate.price')" for="demo-paginate-price"></label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="demo-paginate-price"
              data-cy="price"
              :class="{ valid: !v$.price.$invalid, invalid: v$.price.$invalid }"
              v-model.number="v$.price.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('appGwApp.flowMsDemoPaginate.active')" for="demo-paginate-active"></label>
            <input
              type="checkbox"
              class="form-check"
              name="active"
              id="demo-paginate-active"
              data-cy="active"
              :class="{ valid: !v$.active.$invalid, invalid: v$.active.$invalid }"
              v-model="v$.active.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('appGwApp.flowMsDemoPaginate.ima')" for="demo-paginate-ima"></label>
            <div>
              <div v-if="demoPaginate.ima" class="form-text text-danger clearfix">
                <a
                  class="pull-left"
                  v-on:click="openFile(demoPaginate.imaContentType, demoPaginate.ima)"
                  v-text="t$('entity.action.open')"
                ></a
                ><br />
                <span class="pull-left">{{ demoPaginate.imaContentType }}, {{ byteSize(demoPaginate.ima) }}</span>
                <button
                  type="button"
                  v-on:click="
                    demoPaginate.ima = null;
                    demoPaginate.imaContentType = null;
                  "
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <label for="file_ima" v-text="t$('entity.action.addblob')" class="btn btn-primary pull-right"></label>
              <input
                type="file"
                ref="file_ima"
                id="file_ima"
                style="display: none"
                data-cy="ima"
                v-on:change="setFileData($event, demoPaginate, 'ima', false)"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="ima"
              id="demo-paginate-ima"
              data-cy="ima"
              :class="{ valid: !v$.ima.$invalid, invalid: v$.ima.$invalid }"
              v-model="v$.ima.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="imaContentType"
              id="demo-paginate-imaContentType"
              v-model="demoPaginate.imaContentType"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('appGwApp.flowMsDemoPaginate.dataAnyBlob')"
              for="demo-paginate-dataAnyBlob"
            ></label>
            <div>
              <div v-if="demoPaginate.dataAnyBlob" class="form-text text-danger clearfix">
                <a
                  class="pull-left"
                  v-on:click="openFile(demoPaginate.dataAnyBlobContentType, demoPaginate.dataAnyBlob)"
                  v-text="t$('entity.action.open')"
                ></a
                ><br />
                <span class="pull-left">{{ demoPaginate.dataAnyBlobContentType }}, {{ byteSize(demoPaginate.dataAnyBlob) }}</span>
                <button
                  type="button"
                  v-on:click="
                    demoPaginate.dataAnyBlob = null;
                    demoPaginate.dataAnyBlobContentType = null;
                  "
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <label for="file_dataAnyBlob" v-text="t$('entity.action.addblob')" class="btn btn-primary pull-right"></label>
              <input
                type="file"
                ref="file_dataAnyBlob"
                id="file_dataAnyBlob"
                style="display: none"
                data-cy="dataAnyBlob"
                v-on:change="setFileData($event, demoPaginate, 'dataAnyBlob', false)"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="dataAnyBlob"
              id="demo-paginate-dataAnyBlob"
              data-cy="dataAnyBlob"
              :class="{ valid: !v$.dataAnyBlob.$invalid, invalid: v$.dataAnyBlob.$invalid }"
              v-model="v$.dataAnyBlob.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="dataAnyBlobContentType"
              id="demo-paginate-dataAnyBlobContentType"
              v-model="demoPaginate.dataAnyBlobContentType"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('appGwApp.flowMsDemoPaginate.photo')" for="demo-paginate-photo"></label>
            <div>
              <img
                v-bind:src="'data:' + demoPaginate.photoContentType + ';base64,' + demoPaginate.photo"
                style="max-height: 100px"
                v-if="demoPaginate.photo"
                alt="demoPaginate"
              />
              <div v-if="demoPaginate.photo" class="form-text text-danger clearfix">
                <span class="pull-left">{{ demoPaginate.photoContentType }}, {{ byteSize(demoPaginate.photo) }}</span>
                <button
                  type="button"
                  v-on:click="clearInputImage('photo', 'photoContentType', 'file_photo')"
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <label for="file_photo" v-text="t$('entity.action.addimage')" class="btn btn-primary pull-right"></label>
              <input
                type="file"
                ref="file_photo"
                id="file_photo"
                style="display: none"
                data-cy="photo"
                v-on:change="setFileData($event, demoPaginate, 'photo', true)"
                accept="image/*"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="photo"
              id="demo-paginate-photo"
              data-cy="photo"
              :class="{ valid: !v$.photo.$invalid, invalid: v$.photo.$invalid }"
              v-model="v$.photo.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="photoContentType"
              id="demo-paginate-photoContentType"
              v-model="demoPaginate.photoContentType"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('appGwApp.flowMsDemoPaginate.description')"
              for="demo-paginate-description"
            ></label>
            <textarea
              class="form-control"
              name="description"
              id="demo-paginate-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
              required
            ></textarea>
            <div v-if="v$.description.$anyDirty && v$.description.$invalid">
              <small class="form-text text-danger" v-for="error of v$.description.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="t$('appGwApp.flowMsDemoPaginate.dataEnum')" for="demo-paginate-dataEnum"></label>
            <select
              class="form-control"
              name="dataEnum"
              :class="{ valid: !v$.dataEnum.$invalid, invalid: v$.dataEnum.$invalid }"
              v-model="v$.dataEnum.$model"
              id="demo-paginate-dataEnum"
              data-cy="dataEnum"
            >
              <option
                v-for="language in languageValues"
                :key="language"
                v-bind:value="language"
                v-bind:label="t$('appGwApp.Language.' + language)"
              >
                {{ language }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.cancel')"></span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.save')"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./demo-paginate-update.component.ts"></script>
