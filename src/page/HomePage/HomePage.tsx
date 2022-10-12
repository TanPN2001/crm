import OrderList from '../../components/Content/Orders/OrderLists/OrderLists';
import Header from '../../components/Header/Header';
import LeftBar from '../../components/LeftBar/LeftBar';
import { ReactNode } from 'react';
import './HomePage.css'
import MenuBar from '../../components/LeftBar/MenuBar';

interface IHomePage {
    children: ReactNode;
}

function HomePage({ children }: IHomePage) {
    return (
        <div className="homepage">
            <Header></Header>
            <div className='HomePageContent'>
                <MenuBar></MenuBar>
                <div className="ContentHome">{children}</div>
            </div>

        
        </div>
    );
}

export default HomePage;
