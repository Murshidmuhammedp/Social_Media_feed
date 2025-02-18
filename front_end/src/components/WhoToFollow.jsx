import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack'; // Changed to Joy to maintain consistency

const users = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  followers: Math.floor(Math.random() * 100) + "M",
  avatar: `/static/images/avatar/${index + 1}.jpg`,
}));

export default function EllipsisList() {
  return (
    <Box sx={{ width: 320 }}>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        sx={{ textTransform: 'uppercase', letterSpacing: '0.15rem' }}
      >
        Who to Follow
      </Typography>
      <List aria-labelledby="ellipsis-list-demo" sx={{ '--ListItemDecorator-size': '56px' }}>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemDecorator>
              <Avatar src={user.avatar} />
            </ListItemDecorator>
            <ListItemContent>
              <Typography color="primary" level="title-sm">{user.name}</Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography level="body-sm" noWrap>
                  {user.followers} followers
                </Typography>
                <Button variant="solid">Follow</Button>
              </Stack>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
