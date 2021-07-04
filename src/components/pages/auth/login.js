import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React from 'react';
import Link from 'next/link';
import Select from '@paljs/ui/Select';

import Auth, { Group } from 'components/Auth';
import Layout from 'Layouts';
import getRoute from 'helpers/route';

export default function Index() {
  
  const companies = [
    { value: '1', label: 'Company A' },
    { value: '2', label: 'Company B' },
  ];

  const onCheckbox = () => {
    // v will be true or false
  };


  return (
    <Layout title="Login">
      <Auth title="Login" subTitle="Hello! Login with your email">
        <form>
          <Select size="Medium" options={companies} placeholder="Company Name" />
          <InputGroup fullWidth size="Medium">
            <input type="text" placeholder="User ID" />
          </InputGroup>
          <InputGroup fullWidth size="Medium">
            <input type="password" placeholder="Password" />
          </InputGroup>
          <Group>
            <Checkbox checked onChange={onCheckbox}>
              Remember me
            </Checkbox>
            <Link href={getRoute("auth.forgot.password")}>
              <a>Forgot Password?</a>
            </Link>
          </Group>
          <Button status="Success" type="button" shape="SemiRound" fullWidth>
            Login
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
