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
import {
  Col,
  Row,
  Form,
  DatePicker,
  Input,
  Checkbox,
  Button,
  message,
} from "antd";
import form from "antd/es/form";
const NieBasicInformation = () => {
  const ChecklistStore = useSelector((state: any) => state.Checklist); //store的name=Checklist

  const dispatch = useDispatch();
  const [basicForm] = form.useForm();

  // 表单值变化->更新 store
    const handleBssicFormChange = (changedValues: any, allValues: any) => {
      console.log("onValuesChange", changedValues);
    dispatch(handleChangeBasicInformationValues(changedValues));
    };
    //值变化的同时需要对name进行校验用这个方法
    const handleBssicFormFieldsChange = (changedValues: any, allValues: any) => {
      console.log("onFieldsChange", changedValues);
    };
    const validateAtLastOne = () => {

        const isNovelOrAuthorEmpty = ["likeNovel", "likeAuthor"].every(
          (field) =>
            // basicForm.getFieldValue(field) === (null || undefined || "")
            //上面这行代码有问题，运行起来相当于basicForm.getFieldValue(field) === ""  // 因为 (null || undefined || "") 返回 ""
            !basicForm.getFieldValue(field)
        );
       console.log(isNovelOrAuthorEmpty);
        if (isNovelOrAuthorEmpty) {
          message.error("喜欢的小说和作者至少一项哦");
        }
    }
    const basicFormSubmit = () => {
        
            validateAtLastOne();

    }
    useEffect(() => {
    if (ChecklistStore.NieChecklistReduce.basicInformation) {
      basicForm.setFieldsValue(
        ChecklistStore.NieChecklistReduce.basicInformation
      );
      console.log(basicForm);
    }
    }, []);
    
  return (
    <div className={style["basicInformation"]}>
      <div className={style["basicInformation-title"]}>想了解你更多一点</div>
      <div className={style["basicInformation-container"]}>
        <Form
          layout="vertical"
          form={basicForm}
          onValuesChange={handleBssicFormChange}
          onFieldsChange={handleBssicFormFieldsChange}
          initialValues={{ name: "蔬菜沙拉" }}
        >
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="昵称" name="name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="年龄" name="age">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="生日" name="birthday">
                {/* <DatePicker /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label="星座" name="constellation">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="十六人格" name="character">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label=" " name="isLikeNovel" valuePropName="checked">
                <Checkbox>喜欢看小说嘛？</Checkbox>
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
                  <Form.Item label="最喜欢的小说" name="likeNovel">
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
                  <Form.Item label="最喜欢的作者" name="likeAuthor">
                    <Input disabled={!basicForm.getFieldValue("isLikeNovel")} />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={8}>
              <Form.Item label=" " name="check" >
                <Button onClick={basicFormSubmit}>校验测试</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
export default NieBasicInformation;
