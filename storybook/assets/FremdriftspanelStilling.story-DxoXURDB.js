import{ax as I,U as w,j as t,y as k,S as x,cx as j,cF as y,cE as g,cy as u,Y as b,cZ as _}from"./iframe-DaMpkblx.js";import{w as m,c as A}from"./ContextDecorators-Vo8HlEJH.js";import{F as N,A as v}from"./FullførtStilling-D4OBoULU.js";import{R as T}from"./GjenåpneStillingKnapp-DsD5wG28.js";import{T as E}from"./TilgangskontrollForInnhold-C4Gl5EOY.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Cwcc7zFz.js";import"./OrganisasjonsnummerAlert-h-Di_bNM.js";import"./VStack-23sbLoSw.js";import"./BasePrimitive-CYVGx-uf.js";import"./List-aHBIqAbu.js";import"./Link-Wnvzg6Lp.js";import"./KandidatHendelseTag-SkJw_-Yj.js";import"./Tag-CwJ_OZcS.js";import"./ChatExclamationmark-CPpKFWD2.js";import"./FileXMark-Deto5TrM.js";import"./Trash-Br2F0rQ_.js";import"./HandShakeHeart-BvglSkIT.js";import"./Calendar-kUt3L55e.js";import"./ThumbUp-k0kpUnCx.js";import"./Table-DrZhGpfX.js";import"./index-D1bdHCqu.js";import"./index-B40KJ5b4.js";import"./util-BqxU6O_y.js";import"./DatoVelger-_2SsUMz5.js";import"./useDatepicker-BU68P6DE.js";import"./useControllableState-Dli3H_H5.js";import"./Modal-Bk1drFoQ.js";import"./floating-ui.react-4kzvOiiR.js";import"./Date.Input-DsCO5uBT.js";import"./useFormField-D0gNNOjh.js";import"./ChevronDown-RtuA7GZk.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C28Y73Kt.js";import"./Modal.context-B1rC-gT8.js";import"./Popover-CcqshBRL.js";import"./DismissableLayer-ByifLX4b.js";import"./startOfMonth-DJxSC0_K.js";import"./Select-C6ADZ7Nb.js";import"./endOfMonth-B6U_-FUA.js";import"./ArrowLeft-D1_VhVA9.js";import"./ArrowRight-CF2z6D2R.js";import"./isSameDay-D3QoFH5o.js";import"./Checkbox-BGdl1rQT.js";import"./Fieldset-CjjtpWcF.js";import"./accordion-CiRmzy0o.js";import"./index-DOwrG4z5.js";import"./index-Cu0ZqqLc.js";import"./index-D3teJGWp.js";import"./Box-B7G5kTmj.js";import"./Bell-NqlMVGim.js";import"./PersonChat-BIIO2uBN.js";import"./Eye-CgYrTvx9.js";import"./ProgressBar-AT5pe34u.js";import"./useLatestRef-C3Ad1k7t.js";import"./EyeSlash-DuW8Ihs1.js";import"./CircleSlash-ijVb9O4T.js";import"./Pencil-DhvrD7zu.js";import"./FullførStillingModal-qkSOIe3y.js";import"./PersonbrukerTekst-B_Ir5CMw.js";import"./IkonNavnAvatar-XhJ3Mq7s.js";import"./ClockDashed-D-_9Wgcd.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-CXRV59Om.js";import"./ErrorBoundary-BDc0UJGq.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===y.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Yt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:b.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Yt as default};
