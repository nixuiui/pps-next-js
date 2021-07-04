import React, { useEffect } from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Link from 'next/link';

import Layout from 'Layouts';
import Auth, { Group } from 'components/Auth';
import { useRouter } from 'next/router';
import getRoute from 'helpers/route';

export default function Index() {

  const router = useRouter()
  console.log(router)

  function sendRequestPassword() {
    router.push(getRoute("auth.reset.password"))
  }

  return (
    <Layout title="Forgot Password">
      <Auth title="Forgot Password" subTitle="Input your email address and follow the intruction sent to your email">
        <form>
          <InputGroup fullWidth>
            <input type="email" placeholder="Email Address" />
          </InputGroup>
          <Group>
            <span></span>
            <Link href={getRoute("auth.login")}>
              <a>Back to Login</a>
            </Link>
          </Group>
          <Button status="Success" type="button" shape="SemiRound" fullWidth onClick={sendRequestPassword}>
            Request Password
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
