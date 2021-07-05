import { Button } from '@paljs/ui/Button';
import Spinner from '@paljs/ui/Spinner';
import Alert from '@paljs/ui/Alert';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Select from '@paljs/ui/Select';

import Auth, { Group } from 'components/Auth';
import Layout from 'Layouts';
import getRoute from 'helpers/route';
import { getLanguage, language } from 'helpers/language';
import { convertListToOptions } from 'helpers/general';
import { getCompaniesApi } from '../../../services/api/master-data.api'
import { useRouter } from 'next/router';
import { loginApi } from '../../../services/api/auth.api'

export default function Index() {

  var router = useRouter()

  const lang = getLanguage()

  const [companies, setCompanies] = useState([])
  useEffect(() => {
    getCompaniesApi().then(res => {
      var options = convertListToOptions(res, lang == 'jp' ? 'nameJa' : 'name')
      setCompanies([...options])
    })
  }, [])

  const [isLoading, setLoading] = useState(false)
  const [formState, setFormState] = useState(null)
  const [errorText, setErrorText] = useState(null)
  function onChangeInput(e) {
      setFormState({...formState, [e.target.name]: e.target.value})
  }

  function checkValidation() {
    var isValid = true
    setErrorText(null)
    
    if(formState?.userId == null || formState?.userId == "") {
      isValid = false
      setErrorText({...errorText, userId: "User Id harus diisi"})
    }
    
    if(formState?.password == null || formState?.password == "") {
      isValid = false
      setErrorText({...errorText, password: "Password harus diisi"})
    }

    return isValid
  }

  const login = async () => {
    console.log(errorText)
    if(checkValidation()) {
      var data = {
        "emailOrId" : formState?.userId,
        "password" : formState?.password,
        "company" : formState?.company?._id
      }
      setLoading(true)
      try {
        await loginApi(data)
        router.push(getRoute('home'))
      } catch (err) {
        setErrorText({...errorText, error: err})
      }
      setLoading(false)
    }
  }

  return (
    <Layout title={language().menu.login}>
      <Auth title={language().menu.login}>
        {errorText?.error && <Alert status="Danger">{errorText?.error}</Alert>}
        <form>
          <Select 
            size="Medium" 
            options={companies}
            name="company"
            onChange={(val) => setFormState({...formState, company: val?.value})}
            placeholder={language().placeholder.companyName} />
          <InputGroup fullWidth size="Medium">
            <input 
              type="text" 
              name="userId"
              onChange={(e) => onChangeInput(e)}
              placeholder={language().placeholder.userId} />
          </InputGroup>
          <InputGroup fullWidth size="Medium">
            <input 
              type="password"
              name="password" 
              onChange={(e) => onChangeInput(e)}
              placeholder={language().placeholder.password} />
          </InputGroup>
          <Group>
            <Checkbox checked>
                {language().sentence.rememberMe}
            </Checkbox>
            <Link href={getRoute("auth.forgot.password")}>
              <a>{language().menu.forgotPassword}?</a>
            </Link>
          </Group>
          <Button 
            status="Success" 
            type="button" 
            shape="SemiRound" 
            fullWidth
            style={{ position: 'relative' }}
            onClick={login}>
            {!isLoading && language().menu.login}
            {isLoading && <Spinner size="Medium">Loading...</Spinner>}
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
