import { VueWrapper, flushPromises, mount } from "@vue/test-utils";
import chai from "chai";
import axios from "axios";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import HomeView from "@/views/HomeView.vue";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import App from "@/App.vue";
import { useRouter } from "vue-router";
import router from "@/router";

const expect = chai.expect;
chai.use(sinonChai);

describe("Test Home View", () => {
  let sandbox: sinon.SinonSandbox;
  let wrapper: VueWrapper;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    wrapper?.unmount();
  });

  it("Call get products api", async () => {
    const data = [
      {
        id: 1,
        price: 16.99,
        quantity: 5,
        postDate: "2023-11-21T17:00:00.000Z",
        name: "Iphone 15",
        order: 0,
        updatedAt: "2023-11-18T17:00:00.000Z",
      },
      {
        price: 16.99,
        quantity: 5,
        postDate: "2023-11-21T17:00:00.000Z",
        name: "Oppo Find X",
        id: 2,
        order: 1,
        updatedAt: "2023-11-23T07:41:48.437Z",
      },
    ];
    const resolved = new Promise((r) => r({ data }));
    sandbox.stub(axios, "get").returns(resolved);

    wrapper = mount(HomeView, {
      global: {
        plugins: [PrimeVue, ConfirmationService, ToastService],
        stubs: {
          Button: true,
          MyButton: true,
          Paginator: true,
          ConfirmPopup: true,
          Toast: true,
        },
      },
    });

    await flushPromises();

    expect(wrapper.get("tbody > tr:first-child").html()).to.have.string(
      data[0].name
    );
    expect(wrapper.get("tbody > tr:last-child").html()).to.have.string(
      data[1].name
    );
  }).timeout(10000);

  it("Go to edit product page", async () => {
    const data = [
      {
        id: 1,
        price: 16.99,
        quantity: 5,
        postDate: "2023-11-21T17:00:00.000Z",
        name: "Iphone 15",
        order: 0,
        updatedAt: "2023-11-18T17:00:00.000Z",
      },
    ];
    const resolved = new Promise((r) => r({ data }));
    sandbox.stub(axios, "get").returns(resolved);

    wrapper = mount(HomeView, {
      global: {
        components: { useRouter },
        plugins: [router, PrimeVue, ConfirmationService, ToastService],
        stubs: {
          Paginator: true,
          ConfirmPopup: true,
          Toast: true,
        },
      },
    });
    const push = sinon.spy(router, "push");

    await flushPromises();

    await wrapper
      .get(
        "tbody > tr:first-child > td:last-child button[data-pc-severity='info']"
      )
      .trigger("click");

    expect(push).to.have.been.calledWith(`/products/${data[0].id}`);
  }).timeout(10000);

  it("Go to create product page", async () => {
    router.push("/");
    await router.isReady();

    wrapper = mount(App, {
      shallow: true,
      global: {
        components: { useRouter },
        plugins: [router, PrimeVue, ConfirmationService, ToastService],
        stubs: {
          Button: false,
          MyButton: false,
          RouterView: false,
          HomeView: false,
          FormView: false,
        },
      },
    });

    expect(wrapper.html()).to.have.string("Products List");

    await wrapper.get('button[aria-label="Create"]').trigger("click");
    await flushPromises();

    expect(wrapper.html()).to.have.string("Product Form");
  }).timeout(10000);
});
