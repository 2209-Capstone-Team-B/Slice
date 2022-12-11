import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

const MeetTheTeam = () => {
  const sliceCreators = [
    {
      name: 'Michael Kleyman',
      linkedin: 'https://www.linkedin.com/in/michael-kleyman/',
      github: 'https://github.com/MichaelKleyman',
      image:
        'https://media.licdn.com/dms/image/D4E03AQHlvFy3WidZJA/profile-displayphoto-shrink_400_400/0/1663697694760?e=1675900800&v=beta&t=3brDAv3KeyeBL8tFTryDqD9tQXhlHCmDLJy8HAtKr_c',
    },
    {
      name: 'Allan Luo',
      linkedin: 'https://www.linkedin.com/in/allanluo/',
      github: 'https://github.com/allanjluo',
      image:
        'https://media.licdn.com/dms/image/D5603AQFYxBX0jJv8fQ/profile-displayphoto-shrink_400_400/0/1669606633794?e=1675900800&v=beta&t=CSZvSkKNT04uqTI6UuxzQq7fk3mx99Cp2_xt4DM-S88',
    },
    {
      name: 'Cadre Carrigan',
      linkedin: 'https://www.linkedin.com/in/cadre-carrigan/',
      github: 'https://github.com/MichaelKleyman',
      image:
        'https://media.licdn.com/dms/image/C4D03AQGrsvAPtEeGcA/profile-displayphoto-shrink_400_400/0/1647899270632?e=1675900800&v=beta&t=Rh98SsjiWhdM154XZyEBzYswIzLCIWdV2Fc3S1qo1iU',
    },
    {
      name: 'Scott Irwin',
      linkedin: 'https://www.linkedin.com/in/scott-irwin-wesleyan',
      github: 'https://github.com/sirwin6',
      image:
        'https://media.licdn.com/dms/image/C4E03AQFsn_YQfxsVpA/profile-displayphoto-shrink_400_400/0/1645902697555?e=1675900800&v=beta&t=9cvlcdQMT80M36pE6fEN6Lj7C91T4o4LDHkfOf1NlRs',
    },
    {
      name: 'Tasdid Hossain',
      linkedin: 'https://www.linkedin.com/in/tasdid/',
      github: 'https://github.com/Tasdeed',
      image:
        'https://media.licdn.com/dms/image/C4D03AQGbn1VCgQlhKw/profile-displayphoto-shrink_400_400/0/1594353093530?e=1675900800&v=beta&t=QYtKjZsjo1ZQ97uXBX0KxXvsyJ24KrV75oMv1PreMGE',
    },
  ];

  const redirectTo = (e, link) => {
    window.location.href = link;
  };

  return (
    <div className='flex justify-center items-center flex-row flex-wrap mt-7'>
      {sliceCreators.map((creator) => (
        <Card sx={{ minWidth: 275, margin: 2 }} key={creator.name}>
          <img src={`${creator.image}`} className='object-contain h-48 w-96' />
          <CardHeader
            title={`${creator.name}`}
            subheader='Software Engineer'
          />
          <CardContent>
            <Typography
              variant='body2'
              color='text.secondary'
              className='w-3/4'
            ></Typography>
          </CardContent>
          <CardActions disableSpacing>
            Lets Connect: 
            <IconButton
              aria-label='add to favorites'
              onClick={(e) => redirectTo(e, creator.github)}
            >
              <BsGithub className='hover:fill-black' />
            </IconButton>
            <IconButton
              aria-label='share'
              onClick={(e) => redirectTo(e, creator.linkedin)}
            >
              <BsLinkedin className='hover:fill-black' />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default MeetTheTeam;