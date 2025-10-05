import React from 'react';
import { Button, Modal } from 'antd';

const MyModal = ({
  open,
  onCancel,
  onConfirm,
  confirmLoading,
  children,
  title,
  modalbtntxt,
  btntext,
}) => {
  return (
    <>
      {btntext && (
        <Button type="primary" onClick={() => open !== undefined ? null : onCancel(false)}>
          {btntext}
        </Button>
      )}
      <Modal
        title={title}
        open={open}
        onOk={onConfirm}
        okText={modalbtntxt}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        destroyOnClose
        width={800}
      >
        {children}
      </Modal>
    </>
  );
};

export default MyModal;
