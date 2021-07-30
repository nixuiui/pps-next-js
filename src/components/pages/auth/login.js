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
  const languageText = language()

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
      setErrorText({...errorText, [e.target.name]: null})
  }

  function checkValidation() {
    var isValid = true
    setErrorText(null)
    
    if(formState?.company == null || formState?.company == "") {
      isValid = false
      setErrorText({...errorText, company: languageText.validation.company.notEmpty})
    }
    
    if(formState?.userId == null || formState?.userId == "") {
      isValid = false
      setErrorText({...errorText, userId: languageText.validation.userId.notEmpty})
    }
    
    if(formState?.password == null || formState?.password == "") {
      isValid = false
      setErrorText({...errorText, password: languageText.validation.password.notEmpty})
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
    <Layout title={languageText.menu.login}>
      <Auth title={languageText.menu.login}>
        {errorText?.error && <Alert status="Danger">{errorText?.error}</Alert>}
        <form>
          <div className="mb-5">
            <Select 
              size="Medium" 
              options={companies}
              name="company"
              onChange={(val) => setFormState({...formState, company: val?.value})}
              placeholder={languageText.placeholder.companyName} />
            {errorText?.company && <div className="text-error">{errorText?.company}</div>}
          </div>
          <div className="mb-5">
            <InputGroup 
              fullWidth 
              size="Medium" 
              className="mb-0"
              status={errorText?.userId != null ? "Danger" : "Basic"}>
              <input 
                type="text" 
                name="userId"
                onChange={(e) => onChangeInput(e)}
                placeholder={languageText.placeholder.userId} />
            </InputGroup>
            {errorText?.userId && <div className="text-error">{errorText?.userId}</div>}
          </div>
          <div className="mb-5">
            <InputGroup 
              fullWidth 
              size="Medium" 
              status={errorText?.userId != null ? "Danger" : "Basic"}>
              <input 
                type="password"
                name="password" 
                onChange={(e) => onChangeInput(e)}
                errorText={errorText?.password}
                placeholder={languageText.placeholder.password} />
            </InputGroup>
            {errorText?.password && <div className="text-error">{errorText?.password}</div>}
          </div>
          <Group>
            <Checkbox checked>
                {languageText.sentence.rememberMe}
            </Checkbox>
            <Link href={getRoute("auth.forgot.password")}>
              <a>{languageText.menu.forgotPassword}?</a>
            </Link>
          </Group>
          <Button 
            status="Success" 
            type="button" 
            shape="SemiRound" 
            fullWidth
            style={{ position: 'relative' }}
            onClick={login}>
            {!isLoading && languageText.menu.login}
            {isLoading && <Spinner size="Medium">{languageText.sentence.loading}...</Spinner>}
          </Button>
        </form>
      </Auth>
    </Layout>
  );
}
