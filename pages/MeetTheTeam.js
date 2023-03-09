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
        'https://media.licdn.com/dms/image/D4E35AQFvuFcWJEUYqg/profile-framedphoto-shrink_400_400/0/1674655341289?e=1678993200&v=beta&t=FZzOa9NBQO5TVuiK8pF1pqJy6gywWm-j7oN1NBlKAus',
    },
    {
      name: 'Allan Luo',
      linkedin: 'https://www.linkedin.com/in/allanluo/',
      github: 'https://github.com/allanjluo',
      image:
        'https://media.licdn.com/dms/image/D5603AQFYxBX0jJv8fQ/profile-displayphoto-shrink_400_400/0/1669606633794?e=1683763200&v=beta&t=I5d3Tdj4TVHQq7URnLatduOf8SDoXoU4ZwQM8_KbtZY',
    },
    {
      name: 'Cadre Carrigan',
      linkedin: 'https://www.linkedin.com/in/cadre-carrigan/',
      github: 'https://github.com/cadrec',
      image:
        'https://media.licdn.com/dms/image/C4D03AQGrsvAPtEeGcA/profile-displayphoto-shrink_400_400/0/1647899270632?e=1683763200&v=beta&t=4OIt0PpvHVvn5SafoagITZjaGxqvrYSHt3SKQs90ePo',
    },
    {
      name: 'Scott Irwin',
      linkedin: 'https://www.linkedin.com/in/scott-irwin-wesleyan',
      github: 'https://github.com/sirwin6',
      image:
        'https://media.licdn.com/dms/image/D5603AQGIAZ-WN67VRQ/profile-displayphoto-shrink_400_400/0/1673453582761?e=1683763200&v=beta&t=NNOO9uSv7XfpdDUJSx-naiu0AcKpPGRW8dLWq-AQ9jY',
    },
    {
      name: 'Tasdid Hossain',
      linkedin: 'https://www.linkedin.com/in/tasdid/',
      github: 'https://github.com/Tasdeed',
      image:
        'https://media.licdn.com/dms/image/C4D03AQGbn1VCgQlhKw/profile-displayphoto-shrink_400_400/0/1594353093530?e=1683763200&v=beta&t=MG0PEoKgj8iVsFXF5lqjs955foodH0l2e_YU86Ysn00',
    },
  ];

  const redirectTo = (e, link) => {
    window.location.href = link;
  };

  return (
    <div className='grid grid-cols-3 place-items-center'>
      {sliceCreators.map((creator) => (
        <Card sx={{ minWidth: 275, margin: 2 }} key={creator.name}>
          <img src={`${creator.image}`} className='object-contain h-48 w-96' />
          <CardHeader title={`${creator.name}`} subheader='Software Engineer' />
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
