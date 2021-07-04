import React, { useEffect } from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Link from 'next/link';

import Layout from 'Layouts';
import Auth, { Group } from 'components/Auth';
import { useRouter } from 'next/router';
import getRoute from 'helpers/route';
import { language } from 'helpers/language';

export default function Index() {

  const router = useRouter()
  console.log(router)

  function sendRequestPassword() {
    router.push(getRoute("auth.reset.password"))
  }

  return (
    <Layout title={language().menu.forgotPassword}>
      <Auth title={language().menu.forgotPassword} subTitle={language().subtitle.forgotPassword}>
        <form>
          <InputGroup fullWidth>
            <input type="email" placeholder={language().placeholder.email} />
          </InputGroup>
          <Group>
            <span></span>
            <Link href={getRoute("auth.login")}>
              <a>{language().sentence.backToLogin}</a>
            </Link>
          </Group>
          <Button status="Success" type="button" shape="SemiRound" fullWidth onClick={sendRequestPassword}>
            {language().menu.requestPassword}
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
