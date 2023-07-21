import type { FC } from 'react';

// mui
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// styles
import { Wrapper } from './Credit.styles';

interface CreditProps {
  link?: string;
  name: string | null;
}

const Credit: FC<CreditProps> = ({ link, name }) => {
  return (
    <Wrapper>
      <Link
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.2rem',
        }}
        href={link}
        underline="none"
        rel="noreferrer"
        target="_blank"
        color="#444"
      >
        <Typography fontSize="small">via {name?.split(' ')[0]}</Typography>
        <OpenInNewIcon
          sx={{ color: link ? '#444' : '#999' }}
          fontSize="inherit"
        />
      </Link>
    </Wrapper>
  );
};

export default Credit;
