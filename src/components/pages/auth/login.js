import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React from 'react';
import Link from 'next/link';
import Select from '@paljs/ui/Select';

import Auth, { Group } from 'components/Auth';
import Layout from 'Layouts';
import getRoute from 'helpers/route';
import { language } from 'helpers/language';

export default function Index() {
  
  const companies = [
    { value: '1', label: 'Company A' },
    { value: '2', label: 'Company B' },
  ];

  const onCheckbox = () => {
    // v will be true or false
  };


  return (
    <Layout title={language().menu.login}>
      <Auth title={language().menu.login}>
        <form>
          <Select size="Medium" options={companies} placeholder={language().placeholder.companyName} />
          <InputGroup fullWidth size="Medium">
            <input type="text" placeholder={language().placeholder.userId} />
          </InputGroup>
          <InputGroup fullWidth size="Medium">
            <input type="password" placeholder={language().placeholder.password} />
          </InputGroup>
          <Group>
            <Checkbox checked onChange={onCheckbox}>
                {language().sentence.rememberMe}
            </Checkbox>
            <Link href={getRoute("auth.forgot.password")}>
              <a>{language().menu.forgotPassword}?</a>
            </Link>
          </Group>
          <Button status="Success" type="button" shape="SemiRound" fullWidth>
          {language().menu.login}
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
