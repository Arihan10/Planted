import express from "express"
import AppCtrl from "./app.controller.js"

const router = express.Router()

router.
    route("/")
    .get(AppCtrl.apiGetPlants)

router.
    route("/plant")
    .post(AppCtrl.apiPostPlant)
    .put(AppCtrl.apiPutPlant)

router.route("/getPlant").post(AppCtrl.apiGetPlant)

export default router