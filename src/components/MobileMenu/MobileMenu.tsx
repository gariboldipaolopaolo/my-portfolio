import {FunctionComponent, useRef, useState} from "react";
import {MenuItem} from "@/utils/types";
import MenuPortal from "@/components/MobileMenu/MenuPortal/MenuPortal";
import MenuButton from "@/components/MobileMenu/MenuButton/MenuButton";

interface MobileMenuProps {
    menuItems: MenuItem[];
}

const MobileMenu: FunctionComponent<MobileMenuProps> = ({menuItems}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null);


    const handleToggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <>
            <MenuButton handleToggleMobileMenu={handleToggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen}/>
            {
                isMobileMenuOpen && (
                    <MenuPortal contentRef={contentRef} menuItems={menuItems}
                                handleToggleMobileMenu={handleToggleMobileMenu}
                                isMobileMenuOpen={isMobileMenuOpen}/>
                )
            }
        </>
    )
}

export default MobileMenu;