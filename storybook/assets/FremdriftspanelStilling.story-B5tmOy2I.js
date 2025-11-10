import{aD as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-CwJGDDxU.js";import{w as m,c as E}from"./ContextDecorators-CyDMKkEl.js";import{F as N,A as v}from"./FullførtStilling-1oo_9wB9.js";import{R as T}from"./GjenåpneStillingKnapp-CubSLyrp.js";import{T as D}from"./TilgangskontrollForInnhold-B80uOeru.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-0s43dc-A.js";import"./OrganisasjonsnummerAlert-DshxqxgC.js";import"./VStack-CNDCiyu4.js";import"./BasePrimitive-C0K8S5OZ.js";import"./List-DSOB5wxT.js";import"./Link-C4zblZwC.js";import"./KandidatHendelseTag-CU2V8uNt.js";import"./Tag-DvpnlsWL.js";import"./ChatExclamationmark-TCExgNZD.js";import"./FileXMark-ByaH1a5R.js";import"./Trash-I6-I8uBv.js";import"./HandShakeHeart-B86EDAGA.js";import"./Calendar-DYNUBx1J.js";import"./ThumbUp-1hm_RCSo.js";import"./Table-CYqCPUqO.js";import"./util-BzMn3h64.js";import"./parse-C9xB9BVk.js";import"./getDefaultOptions-CZVpCRBO.js";import"./parseISO-B0hZ3Rqn.js";import"./index-xK0OEAgp.js";import"./index-B40KJ5b4.js";import"./isBefore-Bx_RfGFc.js";import"./util-Bhmt96ml.js";import"./accordion-BqBannqb.js";import"./index-L_4F-e5G.js";import"./index-Do5pobXc.js";import"./index-Dyh5cF1a.js";import"./ChevronDown-CfpJJ6Yq.js";import"./Box-DxfZYdd7.js";import"./Bell-DloyoySL.js";import"./PersonChat-CPq0QJyG.js";import"./Eye-DXIxXXIP.js";import"./ProgressBar-Y9I80fLO.js";import"./EyeSlash-ySFbTMl-.js";import"./CircleSlash-jAdLxbvI.js";import"./Modal-BEGSRuC4.js";import"./floating-ui.react-Fg2d4LGG.js";import"./Date.Input-D9c1Nuk5.js";import"./useFormField-Cb_KudRA.js";import"./useControllableState-DPtKYuyy.js";import"./Modal.context-DhgkVBla.js";import"./Checkbox-CdXTumMY.js";import"./Fieldset-BDPIq3SV.js";import"./Pencil-CRMYFBjg.js";import"./PersonbrukerTekst-CYFcMOAK.js";import"./ClockDashed-BaBfSmb6.js";import"./Tasklist-qDY9ZDx-.js";import"./ErrorBoundary-BeVWeQaT.js";function n({dropDown:r}){const{stillingsData:i,erEier:A}=I(),d=w(i,A),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=E({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=E({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
