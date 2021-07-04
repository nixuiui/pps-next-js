import React from 'react';
import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import Link from 'next/link';

import Layout from 'Layouts';
import Auth, { Group } from 'components/Auth';
import getRoute from 'helpers/route';
import { language } from 'helpers/language';

export default function Index() {
  return (
    <Layout title={language().menu.resetPassword}>
      <Auth title={language().menu.resetPassword}>
        <form>
          <InputGroup fullWidth>
            <input type="password" placeholder={language().placeholder.newPassword} />
          </InputGroup>
          <InputGroup fullWidth>
            <input type="password" placeholder={language().placeholder.confirmPassword} />
          </InputGroup>
          <Group>
            <span></span>
            <Link href={getRoute("auth.login")}>
              <a>{language().sentence.backToLogin}</a>
            </Link>
          </Group>
          <Button status="Success" type="button" shape="SemiRound" fullWidth>
            {language().menu.resetPassword}
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
