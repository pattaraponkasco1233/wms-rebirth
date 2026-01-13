// ตัวอย่างการใช้งาน i18n ใน Component ต่างๆ

import { useTranslation } from "react-i18next";
import { Button, message } from "antd";

// ========================================
// ตัวอย่างที่ 1: ใช้งานพื้นฐาน
// ========================================
export function BasicExample() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("pages.dashboard")}</h1>
      <Button>{t("actions.save")}</Button>
      <Button>{t("actions.cancel")}</Button>
    </div>
  );
}

// ========================================
// ตัวอย่างที่ 2: เปลี่ยนภาษา
// ========================================
export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    message.success(`Changed language to ${lng}`);
  };

  return (
    <div>
      <Button onClick={() => changeLanguage("en")}>English</Button>
      <Button onClick={() => changeLanguage("th")}>ไทย</Button>
      <p>Current: {i18n.language}</p>
    </div>
  );
}

// ========================================
// ตัวอย่างที่ 3: ใช้กับ Form
// ========================================
export function FormExample() {
  const { t } = useTranslation();

  return (
    <form>
      <button type="submit">{t("actions.submit")}</button>
      <button type="reset">{t("actions.reset")}</button>
      <button type="button">{t("actions.cancel")}</button>
    </form>
  );
}

// ========================================
// ตัวอย่างที่ 4: ใช้กับ Message/Notification
// ========================================
export function MessageExample() {
  const { t } = useTranslation();

  const showSuccess = () => {
    message.success(t("labels.success"));
  };

  const showError = () => {
    message.error(t("labels.error"));
  };

  const showWarning = () => {
    message.warning(t("labels.warning"));
  };

  return (
    <div>
      <Button onClick={showSuccess}>Success</Button>
      <Button onClick={showError}>Error</Button>
      <Button onClick={showWarning}>Warning</Button>
    </div>
  );
}

// ========================================
// ตัวอย่างที่ 5: ใช้กับ Table
// ========================================
export function TableExample() {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("labels.name"),
      dataIndex: "name",
    },
    {
      title: t("labels.action"),
      render: () => (
        <>
          <Button>{t("actions.edit")}</Button>
          <Button>{t("actions.delete")}</Button>
        </>
      ),
    },
  ];

  return <div>Table with columns: {JSON.stringify(columns)}</div>;
}

// ========================================
// Key ที่สามารถใช้ได้
// ========================================
/*
common.logout
common.user
common.menu
common.appName

pages.dashboard
pages.bookingCar
pages.truckCheckin
pages.home
pages.login

actions.save
actions.cancel
actions.delete
actions.edit
actions.search
actions.add
actions.submit
actions.reset
actions.refresh
actions.export
actions.import
actions.print
actions.download

labels.welcome
labels.loading
labels.noData
labels.success
labels.error
labels.warning
labels.info
*/
