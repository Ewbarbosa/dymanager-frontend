import styles from './styles.module.scss'

import { Input } from '../Input'
import { Button } from '../Button'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { FormEvent, useState } from 'react'

import { toast } from 'react-toastify'

export function FormProcess() {

  return (
    <>
      <main>
        <Tabs>
          <TabList>
            <Tab>
              <button>
                Button 1
              </button>
            </Tab>
          </TabList>

          <TabPanel>
            <h1>Dados</h1>
            <form>
              <Input 
                placeholder='ID'
              />
              <Input 
                placeholder='Fórum'
              />
              <Input 
                placeholder='Número'
              />
              <Input 
                placeholder='Divisão Judicial'
              />
              <Input 
                placeholder='Ação'
              />
              <Input 
                placeholder='Data de distribuição'
              />
              <Input 
                placeholder='Valor da Causa'
              />
              <Input 
                placeholder='Status'
              />
              <Input 
                placeholder='Input'
              />
              <Input 
                placeholder='Input'
              />
            </form>
          </TabPanel>
        </Tabs>
      </main>
    </>
  )
}