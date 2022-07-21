const preparePinia = function (app) {
    console.log ('initial createPinia: ' + typeof createPinia)
    console.log ('initial piniaPersist: ' + typeof piniaPersist)
    let piniaCreator
    return import('pinia')
        .then (({ createPinia }) => {
            console.log ('then createPinia: ' + typeof createPinia)
            // const { default:piniaPersist } = import ('pinia-plugin-persist')
            // const piniaPersist = import ('pinia-plugin-persist')
            // *todo* messy but necessary; see note just below on array, object altternative
            piniaCreator = createPinia
            return import ('pinia-plugin-persist')
            //
            // // *todo* nota very bene: this will not work, doesn't cause Promise wait
            // //  *todo* on import(). Doing this way passing an object instead of array makes
            // //  *todo* no difference, same problem
            // // return [ import ('pinia-plugin-persist'), createPinia ]
            // return [ import ('pinia-plugin-persist'), createPinia ]
            // // return [ createPinia, piniaPersist ]
        })
        .catch (err => {
            console.error('import pinia-plugin-persist failed: ' + err)
        })
        .then ((piniaPersist) => {
            const createPinia = piniaCreator
        // .then (([ piniaPersist, createPinia ]) => {

            console.log('then2 typeof createPinia: ' + typeof createPinia)
            console.dir(createPinia)
            console.log('then2 typeof piniaPersist: ' + typeof piniaPersist)
            // console.log('then2 piniaPersist-strg: ' + JSON.stringify(piniaPersist))
            console.dir(piniaPersist)
            console.dir(piniaPersist.default)
            // console.log('then2 piniaPersist: ' + piniaPersist)

            // return Promise.all ([ createPinia, piniaPersist ])
            //   .then ((values) => {
            //       console.log (' values: '+ JSON.stringify(values))
            //       const [ createPinia, piniaPersist ] = values


            const pinia = createPinia()
            pinia.use(piniaPersist.default)
            console.log('PINIA CREATED: ' + JSON.stringify(pinia))

            console.log('INSTALLING PlUGIN: '/* + JSON.stringify(pinia)*/)
            return pinia
        })
        .catch (err => {
            console.error('pinia.use pinia-plugin-persist failed: ' + err)
        })
        .then((pinia) => {
            app.use(pinia)
            console.log ('PINIA INSTALLED: ' + pinia) // becomes circular
        })
        .catch ((err) => {
            console.error ('in addPlugins:err: ' + err)
        })
}

const prepare = function (app, extension = 'not named') {
    console.log ('Entering prepare using: ' + typeof app)
    // console.log ('current folder: ' + process.cwd())
    console.log ('About to prepare for extension: ' + extension)

    return preparePinia(app)
        .then (result => {
            console.log(extension + ':prepare result: ' + result)
            console.log ('completed prepare for extension: ' + extension)
        })
        .catch ((err) => {
            console.error ('Prepare failed for: ' + extension + ': ' + err)
        })
}

export default prepare