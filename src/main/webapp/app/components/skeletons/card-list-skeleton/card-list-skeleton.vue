<template>
  <div>
    <b-card v-for="index in 5" :key="index" class="mb-4" bg-variant="light">
      <b-row>
        <b-col lg="1" sm="12">
          <b-skeleton type="avatar"></b-skeleton>
        </b-col>
        <b-col lg="8" sm="12">
          <b-skeleton class="mb-3" width="20%"></b-skeleton>
          <b-skeleton class="mb-3 mt-3" width="30%"></b-skeleton>
          <b-skeleton class="mt-3" width="50%"></b-skeleton>
        </b-col>
        <b-col lg="12">
          <div class="float-right">
            <b-skeleton type="button"></b-skeleton>
          </div>
        </b-col>
      </b-row>
      <b-row class="pt-3">
        <b-col col cols="12">
          <div class="btn-group float-right">
            <b-skeleton type="button"></b-skeleton>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script lang="ts" src="./card-list-skeleton.component.ts"></script>
<style lang="scss" scoped>
.alert-info-card {
  .icon-info {
    font-size: 2.5rem;
  }
}
.card-body .row .center-felx {
  width: 100px;
  padding-bottom: 15px;
}
.card-body .row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.center-felx {
  display: flex;
  align-content: space-around;
  justify-content: flex-start;
  align-items: center;
}
.felx-2 {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  padding-left: 0%;
}
.left-felx {
  p {
    text-align: left;
    margin: 15px;
  }
}
.right-felx {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
}
.col-lg-3 {
  max-width: 100%;
}
.col-lg-8 {
  flex: 0 0 66%;
}

.card-contacto {
  span {
    font-size: 3.1rem !important;
  }
}
.icon-diploma::before,
.icon-libro::before {
  font-size: 60px;
  opacity: 50%;
}
.rt-1 {
  margin: 0em 0 0 auto;
}
.large-labels {
  font-size: 75%;
  font-weight: 700;
  margin-bottom: 16px;
  display: inline-block;
  min-width: 30px;
}
.large-labels span {
  display: block;
  padding: 0 10px;
}
.ll-1 {
  margin: 2px 2px;
  color: #fff;
  background-color: #007bff;
  border-radius: 10px;
  display: inline-block;
}
@media (max-width: 1162px) {
  .col-lg-8 {
    flex: 0 0 50%;
  }
}

@media (max-width: 1100px) {
  .card-body .row {
    flex-wrap: nowrap;
  }
  .card-body .row .center-felx {
    padding: 0;
    margin-left: 5px;
    margin-right: 10px;
  }
  .center-felx span {
    width: 66px;
    height: 66px;
  }
  .left-felx {
    padding: 0;
  }
  .left-felx p {
    margin: 0 17px 0px 0;
    padding: 0;
  }
  .right-felx {
    padding: 0;
  }
  .felx-2 {
    display: block;
    padding: 0;
  }
  .rt-1 {
    margin: 0em auto 0 0;
  }
}
@media (max-width: 518px) {
  .left-felx .card-text {
    width: 234px;
  }
}
</style>
