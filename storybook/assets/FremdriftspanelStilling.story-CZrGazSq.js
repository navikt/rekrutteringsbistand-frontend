import{aq as I,J as w,j as t,R as k,S as j,cz as x,cI as b,cH as g,cA as u,O as y,c$ as _}from"./iframe-DQa1UAKP.js";import{w as m,c as D}from"./ContextDecorators-CBUZbo3p.js";import{F as N,A as v}from"./FullførtStilling-Dks-Mapt.js";import{R as T}from"./GjenåpneStillingKnapp-DWLrwZ9j.js";import{T as A}from"./TilgangskontrollForInnhold-CoeSM1w3.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D94sW2or.js";import"./OrganisasjonsnummerAlert-BBEZJ7v7.js";import"./VStack-PaUjtRpj.js";import"./BasePrimitive-CSzh4H_y.js";import"./List-C0j81Ut8.js";import"./Link-BxG0qBK_.js";import"./KandidatHendelseTag-BswJmHSm.js";import"./Tag-BKmTuQ3h.js";import"./ChatExclamationmark-CbWgNG_0.js";import"./FileXMark-Baefk1XC.js";import"./Trash-Kw9Zps5x.js";import"./HandShakeHeart-D3AMzzS3.js";import"./Calendar-CeD7kRJ5.js";import"./ThumbUp-BlBhjBtJ.js";import"./ExclamationmarkTriangle-CFHatZyD.js";import"./Table-oEbQcJVn.js";import"./index-djMLUd9G.js";import"./index-B40KJ5b4.js";import"./util-CxLzg3xj.js";import"./DatoVelger-CYU433if.js";import"./useDatepicker-DedfWgaM.js";import"./useControllableState-CXsJzE3b.js";import"./Modal-CSMNSt-W.js";import"./floating-ui.react-DJuqNH_e.js";import"./Date.Input-gqCIIY8-.js";import"./useFormField-DpwiCcJU.js";import"./ChevronDown-GJKeW2bL.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-0SK8t1yY.js";import"./Modal.context-duc3HSLS.js";import"./Popover-lePLJu2K.js";import"./DismissableLayer-BDwDPEkL.js";import"./startOfMonth-C640f7Lq.js";import"./Select-XqmNNlg3.js";import"./endOfMonth-UxI5uGxo.js";import"./ArrowLeft-Ddtfl_9F.js";import"./ArrowRight-DWzt0jr_.js";import"./isSameDay-DiNQFE4e.js";import"./Checkbox-Cw5u9KGl.js";import"./Fieldset-BWfMX66k.js";import"./accordion-D7W2V-QT.js";import"./index-BUnC6NoI.js";import"./index-DufrGlNs.js";import"./index-DaELxB03.js";import"./Box-BN3emj-o.js";import"./Bell-CxFcLzt9.js";import"./PersonChat-BdCOtIVi.js";import"./Eye-rGTPb-14.js";import"./ProgressBar-CLaFC3UL.js";import"./useLatestRef-DpVw4J0Y.js";import"./ShieldLock-Cd2Az5wC.js";import"./PadlockLocked-Cu1s0EDh.js";import"./EyeSlash-D2S9IXU-.js";import"./CircleSlash-CDc8rj1d.js";import"./Pencil-DGvs1phf.js";import"./FullførStillingModal-D_eLlL1u.js";import"./PersonbrukerTekst-MGiygtpk.js";import"./ClockDashed-aFd8IYRV.js";import"./IkonNavnAvatar-Cqf0B4l2.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-NhFi70ft.js";import"./ErrorBoundary-D_X1DsLA.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Xt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Xt as default};
