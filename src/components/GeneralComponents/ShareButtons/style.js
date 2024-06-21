import styled from "styled-components";

import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const IconsContainer = styled.div`
    display:flex;
    justify-content:space-around;
    justify-content:flex-end;
    width:100%;
    margin-top:10px;
`;

export const StyledDownload = styled(DownloadIcon)`
    color: ${(props) => (props.isLit === true ? `var(--black)` : `var(--white)`)};
`;

export const StyledShare = styled(ShareIcon)`
    color: ${(props) => (props.isLit === true ? `var(--black)` : `var(--white)`)};
`;

export const StyledWhatsapp = styled(WhatsAppIcon)`
    color: ${(props) => (props.isLit === true ? `var(--black)` : `var(--white)`)};
`;