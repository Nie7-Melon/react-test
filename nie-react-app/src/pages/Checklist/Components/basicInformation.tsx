import React from "react";
import classname from "classnames";
// import (useDispatch, useSelector) from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import style from "./components.module.less";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";
import {
  initChecklistInfo,
  handleChangeBasicInformationValues,
  handleChangeFinallyShowCheckboxList,
  handleChangeBasicInformation,
  handleChangeNieChecklistOptions,
} from "../../../store/Checklist/checklistSlice";
import {
  Col,
  Row,
  Form,
  DatePicker,
  Input,
  Select,
  Checkbox,
  Button,
  message,
} from "antd";
import form from "antd/es/form";
const NieBasicInformation = (props: any) => {
  const ChecklistStore = useSelector((state: any) => state.Checklist); //store的name=Checklist
  const dispatch = useDispatch();
  
  const [basicForm] = form.useForm();
  // 表单值变化->更新 store

  //如果希望单纯的值变化触发方法，要用ValuesChange
  const handleBssicFormChange = (changedValues: any, allValues: any) => {
    // console.log("onValuesChange", changedValues);
    const data = changedValues;
    if ("birthday" in changedValues) {
      const birthdayString = data.birthday?.toString();
      dispatch(
        handleChangeBasicInformationValues({ birthday: birthdayString })
      );

    } else if ("birthdayNextYear" in changedValues) {
      const birthdayNextYearString = data.birthdayNextYear?.toString();
      dispatch(
        handleChangeBasicInformationValues({
          birthdayNextYear: birthdayNextYearString,
        })
      );

    } else {
      dispatch(handleChangeBasicInformationValues(changedValues));
    }
    //三个checkbox选中其一则弹提示消息
    const checkboxFields = [
      "sleepBeforTwelve",
      "drinkWater",
      "eatApple"
    ];
  //判断changeValues中是否有checkbox字段
    const isCheckboxFieldsChange = checkboxFields.some((field) =>
      Object.hasOwn(changedValues, field)
    );
   
    if (isCheckboxFieldsChange) {
      //再判断是选中还是取消选中
      let ifCheckboxTrue = Object.values(changedValues).some(value => value === true)
      console.log("ifCheckboxTrue", ifCheckboxTrue);
      if (ifCheckboxTrue) { 
        console.log('进来了')
        setTimeout(() => {
          message.warning("继续保持哦");
        }, 100);
      }
    }

  };
  //值变化的同时需要对name进行校验可以用FieldsChange这个方法
  //FieldsChange这里有坑：可能触发三次：校验方法被触发也会触发此函数，不但是值变化
  const handleBssicFormFieldsChange = (changedFields: any, allFields: any) => {
    switch (changedFields[0].name[0]) {
      case "birthday":
        if (changedFields[0].value) {
          const birthdayYear = dayjs(
            basicForm.getFieldValue("birthday")
          ).year();
          const nextYear = birthdayYear +1;
          const nextYearAlso = dayjs(basicForm.getFieldValue("birthday"))
            .add(1, "year")
            .year();
          //nextYear和nextYearAlso结果一样
          console.log("birthdayNextYearDate", nextYear, nextYearAlso);
          const nextYearDate = dayjs(basicForm.getFieldValue("birthday")).year(
            nextYear
          );
         
          basicForm.setFieldsValue({ "birthdayNextYear": nextYearDate });
        }
        break;
      
    }
  };
  const validateAtLastOne = () => {
    const isEmpty = ["ifEmptyOne", "ifEmptyTwo"].every(
      (field) =>
        // basicForm.getFieldValue(field) === (null || undefined || "")
        //上面这行代码有问题，运行起来相当于basicForm.getFieldValue(field) === ""  // 因为 (null || undefined || "") 返回 ""
        !basicForm.getFieldValue(field)
    );
    console.log(isEmpty);
    if (isEmpty) {
      return Promise.reject(new Error("自定义校验失败提示：至少要选一个哦"));
    }
    return Promise.resolve();
  };
  const basicFormSubmit = () => {
    console.log("提交按钮触发校验");
  };
  const initInfoValues = () => {
    if (ChecklistStore.NieChecklistReduce?.basicInformation) {
      let newObj = ChecklistStore.NieChecklistReduce.basicInformation;
      if ("birthday" in newObj) {
        newObj = { ...newObj, birthday: dayjs(newObj.birthday) };
      }
      if ("birthdayNextYear" in newObj) {
        newObj = { ...newObj, birthdayNextYear: dayjs(newObj.birthdayNextYear) };
      }
      console.log(newObj);
      basicForm.setFieldsValue(newObj);
    }
  };
  useEffect(() => {
    initInfoValues();
  }, []);

  return (
    <div className={style["basicInformation"]}>
      <div className={style["basicInformation-title"]}>
        BacisInfoForm
        <span className={style["basicInformation-title-span"]}>
          ant design表单联动
        </span>
      </div>
      <div className={style["basicInformation-container"]}>
        <Form
          layout="vertical"
          form={basicForm}
          onValuesChange={handleBssicFormChange}
          onFieldsChange={handleBssicFormFieldsChange}
          initialValues={{
            name: "蔬菜沙拉",
            constellation: " ",
          }}
        >
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="昵称" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={16}>
              <div className={style["basicInformation-declarer"]}>
                日期选择器要求dayjs格式，但是存储要转string格式
              </div>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                label="出生日期"
                name="birthday"
                rules={[{ required: true }]}
              >
                <DatePicker
                  disabledDate={(current) => {
                    return current && current > dayjs().endOf("day");
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="生日后一年（自动填充）" name="birthdayNextYear">
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={16}>
              <div className={style["basicInformation-declarer"]}>
                选项值控制联动：选项值控制其他Item是否必填，是否可编辑
              </div>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="又是美好的一天呢" name="constellation">
                <Select
                  allowClear
                  options={[
                    { value: "happy", label: "祝你天天开心" },
                    { value: "sweet", label: "吃到美食" },
                    { value: "happyAndSweet", label: "我才不做选择" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="天天开心" name="wishYouHappy">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="美美eating" name="wishYouSweet">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[32, 16]}>
            <Col span={16}>
              <div className={style["basicInformation-declarer"]}>
                Checkbox控制联动：选中那么联动项变必填和可编辑
              </div>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                className={style["checkbox-required-item"]}
                name="isLikeNovel"
                valuePropName="checked"
                rules={[{ required: true }]}
                label=" "
              >
                <Checkbox>如果穿书到月光湿地...</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                shouldUpdate={(preValue, curValue) =>
                  preValue.isLikeNovel !== curValue.isLikeNovel
                }
                noStyle //防止双item样式打架
              >
                {() => (
                  <Form.Item
                    label="要给逐日一个大大的拥抱"
                    name="likeNovel"
                    rules={[
                      { required: basicForm.getFieldValue("isLikeNovel") },
                    ]}
                  >
                    <Input disabled={!basicForm.getFieldValue("isLikeNovel")} />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                shouldUpdate={(preValue, curValue) =>
                  preValue.isLikeNovel !== curValue.isLikeNovel
                }
                noStyle
              >
                {() => (
                  <Form.Item
                    label="要多和雾刃去逛逛阿斯特兰纳"
                    name="likeAuthor"
                    rules={[
                      { required: basicForm.getFieldValue("isLikeNovel") },
                    ]}
                  >
                    <Input disabled={!basicForm.getFieldValue("isLikeNovel")} />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={16}>
              <div className={style["basicInformation-declarer"]}>
                {" "}
                多选选择器：其中三个选项选其中一个后，另外两个不可选
              </div>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="" name="character">
                <Select
                  allowClear
                  options={[
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                    { value: "5", label: "5" },
                    { value: "6", label: "6" },
                    { value: "7", label: "7" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={16}>
              <div className={style["basicInformation-declarer"]}>
                下面两个至少填一个，自定义校验触发时机：失焦和form校验时
              </div>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                label="此空和下一个必须填一个"
                name="ifEmptyOne"
                rules={[{ validator: validateAtLastOne }]} //自定义校验触发的方法
                validateTrigger={["onBlur", "submit"]} //自定义校验触发时机：失焦和form校验时
              >
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="自定义校验方法和校验时机"
                name="ifEmptyTwo"
                rules={[{ validator: validateAtLastOne }]} //自定义校验触发的方法
                validateTrigger={["onBlur", "submit"]} //自定义校验触发时机：失焦和form校验时
              >
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label=" " name="check">
                <Button onClick={basicFormSubmit}>校验测试</Button>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={16}>
              <div className={style["basicInformation-declarer"]}>
                下面三个选项，选中会触发提醒
              </div>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item
                name="sleepBeforeTweleve"
                valuePropName="checked"
                rules={[{ required: true }]}
                label=" "
              >
                <Checkbox>十二点之前要睡觉哦</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="drinkWater"
                valuePropName="checked"
                rules={[{ required: true }]}
                label=" "
              >
                <Checkbox>记得多喝水哦</Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="eatApple"
                valuePropName="checked"
                rules={[{ required: true }]}
                label=" "
              >
                <Checkbox>今天吃苹果了吗</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
export default NieBasicInformation;
