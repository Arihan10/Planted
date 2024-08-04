import express from "express"
import AppCtrl from "./app.controller.js"

const router = express.Router()

router.
    route("/")
    .get(AppCtrl.apiGetPlants)

router.
    route("/plant")
    .get(AppCtrl.apiGetPlant)
    .post(AppCtrl.apiPostPlant)
    .put(AppCtrl.apiPutPlant)

export default router