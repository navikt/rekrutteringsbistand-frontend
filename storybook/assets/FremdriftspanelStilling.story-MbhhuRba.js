import{aw as w,U as I,j as t,y as k,S as x,cx as j,cF as y,cE as g,cy as u,Y as b,cZ as _}from"./iframe-CxUg2AuX.js";import{w as m,c as A}from"./ContextDecorators-CDsSm32Y.js";import{F as N,A as v}from"./FullførtStilling-BMdXpkzx.js";import{R as T}from"./GjenåpneStillingKnapp-CuXyJLn7.js";import{T as E}from"./TilgangskontrollForInnhold-CAec1jjo.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CxF4FbJC.js";import"./OrganisasjonsnummerAlert-DKvXnJKB.js";import"./VStack-CF_vrmLD.js";import"./BasePrimitive-Ay1P0RLG.js";import"./List-DzXEyHx1.js";import"./Link-Dtuj5eGY.js";import"./KandidatHendelseTag-BSyUVbt-.js";import"./Tag-mg-6ah9r.js";import"./ChatExclamationmark-BWJ7SL8F.js";import"./FileXMark-VE5DHzjr.js";import"./Trash-CeQdOROa.js";import"./HandShakeHeart-C7uvctws.js";import"./Calendar-D4WinFwz.js";import"./ThumbUp-BiLeHeS0.js";import"./Table-BZvmg8Op.js";import"./index-BtvTKIXR.js";import"./index-B40KJ5b4.js";import"./util-5kE2HE6r.js";import"./DatoVelger-CpnWDq9s.js";import"./useDatepicker-BdoVjxGM.js";import"./useControllableState-B9AVaVs-.js";import"./Modal-J0jh0CrT.js";import"./floating-ui.react-B47RM0oo.js";import"./Date.Input-ClR78xeg.js";import"./useFormField-B8OuaE_r.js";import"./ChevronDown-DsO-4IAD.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CzIkdIPi.js";import"./Modal.context-BkSTZliK.js";import"./Popover-GZ6ZXvo1.js";import"./DismissableLayer-V6EjSsu2.js";import"./startOfMonth-AV8WfJTR.js";import"./Select-DX11gM8i.js";import"./endOfMonth-BzD8PnPG.js";import"./ArrowLeft-D21E_iby.js";import"./ArrowRight-CFXgLMDS.js";import"./isSameDay-Dt8APSKr.js";import"./Checkbox-D_7Wlz4X.js";import"./Fieldset-TvEwmvcK.js";import"./accordion-D3zqT2om.js";import"./index-C5yMGCd6.js";import"./index--ecIsOY_.js";import"./index-Bt-AEGdE.js";import"./Box-BZqmbGx8.js";import"./Bell-BQbGgcFP.js";import"./PersonChat-Mr0Rfi8N.js";import"./Eye-CKcLKWTq.js";import"./ProgressBar-Nd8Lnzo3.js";import"./useLatestRef-B4wDcEGI.js";import"./EyeSlash-BwinMYUd.js";import"./CircleSlash-C5ecABeb.js";import"./Pencil-DDH4-NXU.js";import"./FullførStillingModal-B8KGJC7T.js";import"./PersonbrukerTekst-C114Fgn7.js";import"./ClockDashed-DAXc2s-c.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-CNuA-BL5.js";import"./ErrorBoundary-D8xd6viq.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=w(),d=I(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===y.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:b.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
