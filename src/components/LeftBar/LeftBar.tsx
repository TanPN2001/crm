import './LeftBar.css';
import { GiCardboardBoxClosed } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function LeftBar() {
    const navigate = useNavigate()
    return (
        <div className="WrapperSideBar">
            <div className="OverViewSideBar SelectFeature">
                <div className="OverViewSideBarTxt">Over view</div>
            </div>
            <div className="OrdersSideBar">
                <div className="MenuParent SelectFeature">
                    <GiCardboardBoxClosed size={40}></GiCardboardBoxClosed>
                    <div className="OrdersSideBarTxt">Order</div>
                    <BiChevronDown size={20}></BiChevronDown>
                </div>
                <ul className='UlOrderSideBar'>
                    <li className="NextNavItems" onClick={()=>{
                        navigate('/order')
                    }}>Order list</li>
                    <li className="NextNavItems">Order categories</li>
                    <li className="NextNavItems">Warehouse Management</li>
                </ul>
            </div>
            <div className="ProductsSideBar SelectFeature">
                <div className="ProductsSideBarTxt" onClick={()=>{
                    navigate('/product')
                }}> Product</div>
            </div>
            <div className="CustomersSideBar SelectFeature">
                <div className="CustomersSideBarTxt">Customer</div>
            </div>
            <div className="PromotionsSideBar SelectFeature">
                <div className="PromotionsSideBarTxt">Promotion</div>
            </div>
            <div className="ReportSideBar SelectFeature">
                <div className="ReportSideBarTxt">Report</div>
            </div>
            <div className="WebsiteBar SelectFeature">
                <div className="WebsiteBarTxt">Website</div>
            </div>
            <div className="ApplicationSideBar SelectFeature">
                <div className="ApplicationSideBarTxt">Application</div>
            </div>
            <div className="CRMExpressSideBar SelectFeature">
                <div className="CMRExpressSideBarTxt">CRMExpress</div>
            </div>
        </div>
    );
}

export default LeftBar;
