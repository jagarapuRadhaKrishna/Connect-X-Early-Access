import CareerApplication from '../models/CareerApplication'

export async function generateCareerApplicationId(): Promise<string> {
  const year = new Date().getFullYear()
  
  // Find the last application ID for this year
  const lastApplication = await CareerApplication.findOne({
    where: {
      application_id: {
        // @ts-ignore
        [require('sequelize').Op.like]: `CTX-CAREER-${year}-%`
      }
    },
    order: [['id', 'DESC']]
  })

  let sequence = 1
  if (lastApplication) {
    const lastSequence = parseInt(lastApplication.application_id.split('-').pop() || '0')
    sequence = lastSequence + 1
  }

  // Format: CTX-CAREER-YYYY-000001
  return `CTX-CAREER-${year}-${sequence.toString().padStart(6, '0')}`
}
