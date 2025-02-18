import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Avatar from '@mui/joy/Avatar';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/joy/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Box } from '@mui/system';

const materialTheme = createTheme();

export default function AlignItemsList() {
  const comments = [
    {
      name: 'Ali Connors',
      text: "I'll be in your neighborhood doing errands this…",
      avatar: '/static/images/avatar/1.jpg',
    },
    {
      name: 'Travis Howard',
      text: "Wish I could come, but I'm out of town this…",
      avatar: '/static/images/avatar/2.jpg',
    },
    {
      name: 'Sandra Adams',
      text: 'Do you have Paris recommendations? Have you ever…',
      avatar: '/static/images/avatar/3.jpg',
    },
  ];

  return (
    <CssVarsProvider>
      <ThemeProvider theme={materialTheme}>
        <Card variant="outlined" sx={{ bgcolor: 'background.level2', p: 1, borderRadius: 2 }}>
          <CardContent>
            <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, borderRadius: 2 }}>
              {comments.map((comment, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      '&:hover': { backgroundColor: '#f5f5f5' },
                      padding: 2,
                      borderRadius: 1,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <ListItemDecorator>
                      <Avatar alt={comment.name} src={comment.avatar} sx={{ border: '2px solid #ddd' }} />
                    </ListItemDecorator>
                    <Box sx={{ flex: 1 }}>
                      <Typography component="span" variant="body2" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                        {comment.text}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton sx={{ color: 'primary.main' }}>
                        <ThumbUpIcon />
                      </IconButton>
                      <IconButton sx={{ color: 'error.main' }}>
                        <ThumbDownIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                  {index !== comments.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </ThemeProvider>
    </CssVarsProvider>
  );
}
