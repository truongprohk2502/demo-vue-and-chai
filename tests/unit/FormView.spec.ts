import { VueWrapper, flushPromises, mount } from "@vue/test-utils";
import chai from "chai";
import axios from "axios";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import FormView from "@/views/FormView.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import { useRoute } from "vue-router";
import router from "@/router";
import { useForm, useField } from "vee-validate";
import waitForExpect from "wait-for-expect";

const expect = chai.expect;
chai.use(sinonChai);

describe("Test Form View", () => {
  let sandbox: sinon.SinonSandbox;
  let wrapper: VueWrapper;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    wrapper?.unmount();
  });

  it("Show form validation errors", async () => {
    router.push("/products/create");
    await router.isReady();

    wrapper = mount(FormView, {
      global: {
        components: {
          useRoute,
          useForm,
          useField,
        },
        plugins: [router, PrimeVue, ToastService],
        stubs: {
          DateInput: true,
        },
      },
    });

    expect(wrapper.get("h1").html()).to.have.string("Product Form");

    await wrapper.get("form").trigger("submit");

    await flushPromises();

    await waitForExpect(() => {
      expect(
        wrapper.get("form > div:first-of-type > small").text()
      ).to.have.string("name is a required field");
      expect(
        wrapper.get("form > div:nth-of-type(2) > small").text()
      ).to.have.string("quantity is a required field");
      expect(
        wrapper.get("form > div:nth-of-type(3) > small").text()
      ).to.have.string("price is a required field");
    });
  }).timeout(10000);

  it("Show submit success toast", async () => {
    router.push("/products/1");
    await router.isReady();

    const data = {
      id: 1,
      price: 16.99,
      quantity: 5,
      postDate: "2023-11-21T17:00:00.000Z",
      name: "Iphone 15",
      order: 0,
      updatedAt: "2023-11-18T17:00:00.000Z",
    };
    const resolved = new Promise((r) => r({ data }));
    sandbox.stub(axios, "get").returns(resolved);
    sandbox.stub(axios, "post").returns(resolved);
    sandbox.stub(axios, "put").returns(resolved);

    wrapper = mount(FormView, {
      global: {
        components: {
          useRoute,
          useForm,
          useField,
        },
        plugins: [router, PrimeVue, ToastService],
        stubs: {
          DateInput: true,
        },
      },
    });

    await flushPromises();

    expect(wrapper.get("h1").html()).to.have.string("Product Form");

    await wrapper.get("form").trigger("submit");

    await flushPromises();

    await waitForExpect(() => {
      expect(
        wrapper.get("form > div:first-of-type > small").text()
      ).to.not.have.string("name is a required field");
      expect(
        wrapper.get("form > div:nth-of-type(2) > small").text()
      ).to.not.have.string("quantity is a required field");
      expect(
        wrapper.get("form > div:nth-of-type(3) > small").text()
      ).to.not.have.string("price is a required field");
      expect(axios.put).to.have.been.calledOnce;
    });
  }).timeout(10000);
});
