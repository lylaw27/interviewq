'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function insertCareer(formData: FormData) {
  const supabase = createClient()
  const data = {
    eng_name: formData.get('newEngName') as string,
    chi_name: formData.get('newChiName') as string,
  }
  console.log(data);
  const { error } = await supabase
  .from('occupation')
  .insert({ eng_name: data.eng_name, chi_name: data.chi_name})
  if (error) {
    redirect('/error')
  }
}

export async function deleteCareer(occupationId: number) {
    const supabase = createClient()
    const { error } = await supabase
    .from('occupation')
    .delete()
    .eq('question_id',occupationId)
    if (error) {
      redirect('/error')
    }
  }

export async function fetchCareer(occupationId: number){
  const supabase = createClient()
  const { data, error } = await supabase
  .from('occupation')
  .select()
  .eq('occupation_id', occupationId)
  if (error) {
    redirect('/error')
  }
  return(data)
}