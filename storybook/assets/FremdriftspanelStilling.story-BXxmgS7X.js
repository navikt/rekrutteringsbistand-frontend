import{aD as I,M as w,j as t,q as k,S as x,cx as j,cB as b,cD as g,cy as u,P as y,cR as _}from"./iframe-BqqySmLp.js";import{w as m,c as A}from"./ContextDecorators-B5oB19gW.js";import{F as N,A as v}from"./FullførtStilling-DzJrFKrN.js";import{R as T}from"./GjenåpneStillingKnapp-BJUhpOjD.js";import{T as D}from"./TilgangskontrollForInnhold-9TfiKnqn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-B9OXJk3i.js";import"./OrganisasjonsnummerAlert-kkbhqWlF.js";import"./VStack-BtxADtMi.js";import"./BasePrimitive-BWzRNP55.js";import"./List-Dl1pxlvW.js";import"./Link-Aullpp7r.js";import"./KandidatHendelseTag-lpezpa5f.js";import"./Tag-IBbczY_i.js";import"./ChatExclamationmark-CXSpNDx3.js";import"./FileXMark-C4vWb03I.js";import"./Trash-DCOqJRkl.js";import"./HandShakeHeart-3fqyHM30.js";import"./Calendar-0jmLLsES.js";import"./ThumbUp-0bgjpBki.js";import"./Table-Ct2DEnrv.js";import"./util-DU_KQZE4.js";import"./parse-C6VNkl2A.js";import"./getDefaultOptions-DvDgDEsD.js";import"./parseISO-CNsO-bOz.js";import"./index-CveF8mzD.js";import"./index-B40KJ5b4.js";import"./isBefore-CVPzrcI2.js";import"./util-vYIPvJw_.js";import"./accordion-CaagENHK.js";import"./index-CCzpDAA7.js";import"./index-D5y1zVzR.js";import"./index-DhIcHK0i.js";import"./ChevronDown-BnApHggW.js";import"./Box-BdsSPynW.js";import"./Bell-C1wrj7A6.js";import"./PersonChat-CoHcV8Ft.js";import"./Eye-SVfMlon3.js";import"./ProgressBar-CxOy_Fl3.js";import"./EyeSlash-bMz6f99J.js";import"./CircleSlash-BKiEDOHP.js";import"./Modal-50crVqlb.js";import"./floating-ui.react-B-xuQX2d.js";import"./Date.Input-jDUq28oh.js";import"./useFormField-7OmZcCS_.js";import"./useControllableState-CEMIviyc.js";import"./Modal.context-CnB7G1fS.js";import"./Checkbox-B5j4Pc-3.js";import"./Fieldset-D2Bkw2Iu.js";import"./Pencil-B22dur5y.js";import"./PersonbrukerTekst-Df8AiWMJ.js";import"./ClockDashed-fbUc-dev.js";import"./Tasklist-xKsBTdch.js";import"./ErrorBoundary-CTJYFA2q.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ut as default};
