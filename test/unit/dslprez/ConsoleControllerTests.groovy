package dslprez



import org.junit.*
import grails.test.mixin.*

@TestFor(ConsoleController)
@Mock(Console)
class ConsoleControllerTests {


    def populateValidParams(params) {
      assert params != null
      // TODO: Populate valid properties like...
      //params["name"] = 'someValidName'
    }

    void testIndex() {
        controller.index()
        assert "/console/list" == response.redirectedUrl
    }

    void testList() {

        def model = controller.list()

        assert model.consoleInstanceList.size() == 0
        assert model.consoleInstanceTotal == 0
    }

    void testCreate() {
       def model = controller.create()

       assert model.consoleInstance != null
    }

    void testSave() {
        controller.save()

        assert model.consoleInstance != null
        assert view == '/console/create'

        response.reset()

        populateValidParams(params)
        controller.save()

        assert response.redirectedUrl == '/console/show/1'
        assert controller.flash.message != null
        assert Console.count() == 1
    }

    void testShow() {
        controller.show()

        assert flash.message != null
        assert response.redirectedUrl == '/console/list'


        populateValidParams(params)
        def console = new Console(params)

        assert console.save() != null

        params.id = console.id

        def model = controller.show()

        assert model.consoleInstance == console
    }

    void testEdit() {
        controller.edit()

        assert flash.message != null
        assert response.redirectedUrl == '/console/list'


        populateValidParams(params)
        def console = new Console(params)

        assert console.save() != null

        params.id = console.id

        def model = controller.edit()

        assert model.consoleInstance == console
    }

    void testUpdate() {
        controller.update()

        assert flash.message != null
        assert response.redirectedUrl == '/console/list'

        response.reset()


        populateValidParams(params)
        def console = new Console(params)

        assert console.save() != null

        // test invalid parameters in update
        params.id = console.id
        //TODO: add invalid values to params object

        controller.update()

        assert view == "/console/edit"
        assert model.consoleInstance != null

        console.clearErrors()

        populateValidParams(params)
        controller.update()

        assert response.redirectedUrl == "/console/show/$console.id"
        assert flash.message != null

        //test outdated version number
        response.reset()
        console.clearErrors()

        populateValidParams(params)
        params.id = console.id
        params.version = -1
        controller.update()

        assert view == "/console/edit"
        assert model.consoleInstance != null
        assert model.consoleInstance.errors.getFieldError('version')
        assert flash.message != null
    }

    void testDelete() {
        controller.delete()
        assert flash.message != null
        assert response.redirectedUrl == '/console/list'

        response.reset()

        populateValidParams(params)
        def console = new Console(params)

        assert console.save() != null
        assert Console.count() == 1

        params.id = console.id

        controller.delete()

        assert Console.count() == 0
        assert Console.get(console.id) == null
        assert response.redirectedUrl == '/console/list'
    }
}
