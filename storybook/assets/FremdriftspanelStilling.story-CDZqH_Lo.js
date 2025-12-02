import{ax as I,U as w,j as t,y as k,S as x,cz as j,cH as b,cG as g,cA as u,Y as y,c$ as _}from"./iframe-DYebcAac.js";import{w as m,c as D}from"./ContextDecorators-DGXRxUfB.js";import{F as N,A as v}from"./FullførtStilling-LIYN3Wm7.js";import{R as T}from"./GjenåpneStillingKnapp-B1vj66OT.js";import{T as A}from"./TilgangskontrollForInnhold-BDwrzHUI.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C2DOphGQ.js";import"./OrganisasjonsnummerAlert-3JKXLxol.js";import"./VStack-BXgQHkJH.js";import"./BasePrimitive-CRUxVIom.js";import"./List-B2JosOUI.js";import"./Link-CvjscnMo.js";import"./KandidatHendelseTag-CtxiF6k9.js";import"./Tag-B0qlNe2D.js";import"./ChatExclamationmark-Vm4Ti-4P.js";import"./FileXMark-Bz7kePTl.js";import"./Trash-BoeAt-iU.js";import"./HandShakeHeart-BOLx3G0Q.js";import"./Calendar-8ApYkf7s.js";import"./ThumbUp-DjcY46H4.js";import"./Table-DSoqSj2C.js";import"./index-Cj7qpNcs.js";import"./index-B40KJ5b4.js";import"./util-B_AA4L4z.js";import"./DatoVelger-CQ2txX6Z.js";import"./useDatepicker-DFKjFJCk.js";import"./useControllableState-C8fzJ6EH.js";import"./Modal-COqdtEtc.js";import"./floating-ui.react-CLtdJFP3.js";import"./Date.Input-COhCvR1O.js";import"./useFormField-Bk3OyaAW.js";import"./ChevronDown-BQ1H2NSN.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-FTSIvdKE.js";import"./Modal.context-C5bciP-B.js";import"./Popover-8xdJAmhG.js";import"./DismissableLayer-ypqI2WT0.js";import"./startOfMonth-DBRFcm1v.js";import"./Select-BJvQISO8.js";import"./endOfMonth-CCuctWnu.js";import"./ArrowLeft-BsnN3Y3_.js";import"./ArrowRight-yyuh3QUV.js";import"./isSameDay-xVPU853N.js";import"./Checkbox-DrmofbGh.js";import"./Fieldset-C36rODsW.js";import"./accordion-BhKdO9se.js";import"./index-D_b6usAT.js";import"./index-CEYYaE_h.js";import"./index-BkMgbk_1.js";import"./Box-BSGJkrRu.js";import"./Bell-CiOVKAED.js";import"./PersonChat-Dd6f0igW.js";import"./Eye-Cw-QOzlk.js";import"./ProgressBar-DM6Nep3_.js";import"./useLatestRef-x4xRX3MJ.js";import"./EyeSlash-DZW4WbfU.js";import"./CircleSlash-D2qlKbMB.js";import"./Pencil-CbJt8WET.js";import"./FullførStillingModal-ChItWtn6.js";import"./PersonbrukerTekst-ClY1wHy3.js";import"./ClockDashed-BXarJ3x7.js";import"./IkonNavnAvatar-CCc0gHDO.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-CErhQ4e-.js";import"./ErrorBoundary-BBCLOFZB.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Wt as default};
