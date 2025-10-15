import{a5 as I,a_ as w,j as t,R as k,S as j,a6 as x,cq as b,ak as g,cC as u,av as _,cD as y}from"./iframe-BBDbIFjR.js";import{w as d,c as A}from"./ContextDecorators-BgR_YN1U.js";import{F as N,A as v}from"./FullførtStilling-DyyRu7WR.js";import{R as T}from"./GjenåpneStillingKnapp-yoMe7x8F.js";import{T as D}from"./TilgangskontrollForInnhold-DluoXyhp.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-B_vzGjRw.js";import"./OrganisasjonsnummerAlert-Cb7JRevL.js";import"./VStack-DdDM8iLd.js";import"./BasePrimitive-Xk6F7ow-.js";import"./List-Dy10NIAt.js";import"./Link-CRWTseRM.js";import"./KandidatHendelseTag-DbjD_UcX.js";import"./Tag-Chl9ZaGi.js";import"./FileXMark-BGZJic3P.js";import"./Trash-BY8CB64_.js";import"./HandShakeHeart-DqXBBy4B.js";import"./Calendar-ncQZlya2.js";import"./ThumbUp-CwueX98e.js";import"./Table-BEi9r9ck.js";import"./util-r0BUv_b9.js";import"./format-Dvm4FpV7.js";import"./match-BbABV3H0.js";import"./parseISO-DpxG9qW5.js";import"./parse-CFDYvMeN.js";import"./getDefaultOptions-6sAuUIcW.js";import"./util-Cp2yv8N7.js";import"./accordion-DdgKnNuz.js";import"./index-CG9mIorK.js";import"./index-CxoFhiMl.js";import"./index-DloUN2ko.js";import"./ChevronDown-BsY05VRN.js";import"./Box-DebXy63Z.js";import"./Bell-B6XNou1x.js";import"./PersonChat-B5uCaF8e.js";import"./Eye-6C0wrACp.js";import"./ProgressBar-C1_JNq35.js";import"./EyeSlash-DbN9ce4v.js";import"./CircleSlash--Aizr8jJ.js";import"./Modal-IduDv7Cn.js";import"./floating-ui.react-Db9XEqj9.js";import"./Date.Input-CsGM4pxy.js";import"./useFormField-BcwoBhJn.js";import"./useControllableState-BWhluZK-.js";import"./Modal.context-74hVkHzZ.js";import"./Checkbox-D2amyM9y.js";import"./Fieldset-B62VDUEr.js";import"./Pencil-a_-vaK4q.js";import"./PersonbrukerTekst-Cituqsry.js";import"./ClockDashed-bce04JWq.js";import"./Tasklist-CPmaT-qt.js";import"./ErrorBoundary-BcFZ1fV-.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},a={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},o={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:_.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=y,i=A({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,a as AktivDropdown,p as FormidlingVariant,o as Fullført,vt as default};
