import React, { useState } from 'react';
import CouponTable from '../components/coupons/CouponTable';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import Button from '../common/Button';
import AddCoupons from '../components/coupons/AddCoupons';

function Coupons() {
    const [show, setShow] = useState(false);
    const [editCoupon, setEditCoupon] = useState(null);

    return (
        <div>
            {!show ? (
                <div>
                    <div className="flex justify-between mb-5">
                        <h1 className="text-[24px] font-bold">Discount</h1>
                        <div className="flex gap-2">
                            <Button
                                label="Create"
                                icon={FiPlus}
                                variant="filled"
                                onClick={() => {
                                    setEditCoupon(null); // no edit, just create
                                    setShow(true);
                                }}
                            />
                        </div>
                    </div>
                    <CouponTable onEdit={(coupon) => {
                        setEditCoupon(coupon);
                        setShow(true);
                    }} />
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => {
                            setShow(false);
                            setEditCoupon(null);
                        }}
                        className="flex gap-2 items-center cursor-pointer mb-2"
                    >
                        <FiArrowLeft /> Back
                    </button>
                    <AddCoupons onSaveSuccess={() => {
                        setShow(false); // back to table view
                        setEditCoupon(null); // reset edit mode
                    }} editId={editCoupon} />
                </div>
            )}
        </div>
    );
}

export default Coupons;
