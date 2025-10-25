import React from "react";
import classname from "classnames";
// import (useDispatch, useSelector) from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import style from "./components.module.less";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  initChecklistInfo,
  handleChangeBasicInformationValues,
  handleChangeFinallyShowCheckboxList,
  handleChangeBasicInformation,
  handleChangeNieChecklistOptions,
} from "../../../store/Checklist/checklistSlice";
const NieHobbyInformation = () => {
  const ChecklistStore = useSelector((state: any) => state.Checklist); //store的name=Checklist
  const dispatch = useDispatch();

  return (
    <div className={style["hobbyInformation"]}>
      <div className={style["hobbyInformation-title"]}> HobbyInformation</div>
    </div>
  );
};
export default NieHobbyInformation;
