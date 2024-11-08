'use client';
import { Box, Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { AvatarImage } from '@/components/AvatarImage';
import { devConsoleError } from '@/helpers/devConsoleLogs';
import { getUserByUsername } from '@/helpers/userApi';
import { User } from '@/types';

type PageParams = {
  username: string;
};

type PageProps = {
  readonly params: PageParams;
};

const Page = ({ params }: PageProps) => {
  const username: string = params.username;
  const [subscriptions, setSubscriptions] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUserByUsername(username);
        setSubscriptions(user.subscriptions);
        setLoading(false);
      } catch (error) {
        devConsoleError('Error fetching data:', error);
      }
    }

    fetchData();
  }, [username]);

  return (
    <>
      {loading ? (
        <Card className='card'>
          <CardContent className='card-content'>
            <Box className='meta-container'>
              <Skeleton variant='rounded' width={32} height={32} />
              <Skeleton variant='text' width={100} />
            </Box>
          </CardContent>
        </Card>
      ) : (
        subscriptions?.map((user) => (
          <Card key={user.username} variant='outlined' className='card'>
            <CardContent className='card-content'>
              <Box className='meta-container'>
                <>
                  <AvatarImage
                    className='article-user-avatar'
                    src={user.avatarUrl}
                    alt={user.username}
                    variant='rounded'
                    size={32}
                  />
                  <Link
                    href={`/users/${user.username}`}
                    className='subscriptions-user-name'
                  >
                    @{user.username}
                  </Link>
                </>
                <div className='subscriptions-user-description'>
                  {user.shortInfo}
                </div>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
};

export default Page;
