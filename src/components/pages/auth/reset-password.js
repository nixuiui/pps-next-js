import React from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Link from 'next/link';

import Layout from 'Layouts';
import Auth, { Group } from 'components/Auth';
import getRoute from 'helpers/route';

export default function Index() {
  return (
    <Layout title="Reset Password">
      <Auth title="Reset Password">
        <form>
          <InputGroup fullWidth>
            <input type="password" placeholder="New Password" />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder="Confirm Password" />
          </InputGroup>
          <Group>
            <span></span>
            <Link href={getRoute("auth.login")}>
              <a>Back to Login</a>
            </Link>
          </Group>
          <Button status="Success" type="button" shape="SemiRound" fullWidth>
            Reset Password
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
